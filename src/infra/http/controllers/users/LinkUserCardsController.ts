import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { FindUserByIdUseCase } from 'src/domain/user/application/usecases/find-user-by-id'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { LinkUserCardsToUserUseCase } from 'src/domain/user/application/usecases/link-cards-to-user'
import { UserCardPresenter } from '../../presenters/user-card-presenter'

const linkUserCardsBodySchema = z.object({
  deckId: z.string().ulid(),
  quantity: z.number().optional().default(10),
})

type LinkUserCardsBodySchema = z.infer<typeof linkUserCardsBodySchema>

const bodyValidationPipe = new ZodValidationPipe(linkUserCardsBodySchema)

@Controller('users/link-cards')
export class LinkUserCardsController {
  constructor(
    private readonly linkUserCardsToUserUseCase: LinkUserCardsToUserUseCase,
  ) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: LinkUserCardsBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      sub: { userId },
    } = user

    const { deckId, quantity } = linkUserCardsBodySchema.parse(body)

    const result = await this.linkUserCardsToUserUseCase.execute({
      userId,
      deckId,
      quantity,
    })

    if (result.isLeft()) throw new BadRequestException()

    return {
      userCards: result.value.userCards.map((card) =>
        UserCardPresenter.toHTTP(card),
      ),
    }
  }
}

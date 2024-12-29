import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { FindUserByIdUseCase } from 'src/domain/user/application/usecases/find-user-by-id'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { UserPresenter } from '../../presenters/user-presenter'
import { GetUserCardsByUserIdAndDeckIdUseCase } from 'src/domain/user/application/usecases/get-user-cards-by-user-id'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UserCardPresenter } from '../../presenters/user-card-presenter'

const getUserCardsBodySchema = z.object({
  deckId: z.string().ulid(),
})

type GetUserCardsBodySchema = z.infer<typeof getUserCardsBodySchema>

const bodyValidationPipe = new ZodValidationPipe(getUserCardsBodySchema)

@Controller('users/cards')
export class GetUserCardsController {
  constructor(
    private readonly getUserCardsByUserIduseCase: GetUserCardsByUserIdAndDeckIdUseCase,
  ) {}

  @Get(':deckId')
  async findUserById(
    @Param(bodyValidationPipe) param: GetUserCardsBodySchema,
    @CurrentUser() me: UserPayload,
  ) {
    const {
      sub: { userId },
    } = me

    const { deckId } = getUserCardsBodySchema.parse(param)

    const result = await this.getUserCardsByUserIduseCase.execute({
      userId,
      deckId,
    })

    if (result.isLeft()) throw new BadRequestException()

    return {
      useCards: result.value.userCards.map((card) =>
        UserCardPresenter.toHTTP(card),
      ),
    }
  }
}

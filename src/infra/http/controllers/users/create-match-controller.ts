import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateMatchUseCase } from '@/domain/user/application/usecases/create-match'
import { MatchPresenter } from '../../presenters/match-presenter'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { SomethingGoesWrongError } from '@/domain/user/application/usecases/errors/something-goes-wrong'

const createMatchBodySchema = z.object({
  deckId: z.string(),
})

type CreateMatchBodySchema = z.infer<typeof createMatchBodySchema>

const bodySchema = new ZodValidationPipe(createMatchBodySchema)

@Controller('/users/match')
export class CreateMatchController {
  constructor(private createMatch: CreateMatchUseCase) {}

  @Post()
  async handle(
    @Body(bodySchema) body: CreateMatchBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { deckId } = createMatchBodySchema.parse(body)
    const {
      sub: { userId },
    } = user

    const result = await this.createMatch.execute({ userId, deckId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SomethingGoesWrongError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { match: MatchPresenter.toHTTP(result.value.match) }
  }
}

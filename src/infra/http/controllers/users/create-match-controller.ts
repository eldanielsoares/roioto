import {
  BadRequestException,
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { CreateUserUseCase } from 'src/domain/user/application/usecases/create-user'
import { CreateMatchUseCase } from 'src/domain/user/application/usecases/create-match'
import { MatchPresenter } from '../../presenters/match-presenter'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

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
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { match: MatchPresenter.toHTTP(result.value.match) }
  }
}

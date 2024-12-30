import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Put,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { MatchPresenter } from '../../presenters/match-presenter'
import { UpdateMatchShotsByIdUseCase } from 'src/domain/user/application/usecases/update-match-shots-by-id'

const updateMatchBodySchema = z.object({
  cardId: z.string(),
})

type UpdateMatchBodySchema = z.infer<typeof updateMatchBodySchema>

const bodySchema = new ZodValidationPipe(updateMatchBodySchema)

@Controller('/users/match')
export class UpdateMatchShotsController {
  constructor(private updateMatch: UpdateMatchShotsByIdUseCase) {}

  @Put(':id')
  async handle(
    @Body(bodySchema) body: UpdateMatchBodySchema,
    @Param('id') id: string,
  ) {
    const { cardId } = updateMatchBodySchema.parse(body)

    const result = await this.updateMatch.execute({ cardId, matchId: id })

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

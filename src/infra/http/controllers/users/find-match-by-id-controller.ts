import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { MatchPresenter } from '../../presenters/match-presenter'
import { FindMatchByIdUseCase } from 'src/domain/user/application/usecases/find-match-by-id'

@Controller('/users/match')
export class FindMatchByIdController {
  constructor(private findMatchById: FindMatchByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const result = await this.findMatchById.execute(id)

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

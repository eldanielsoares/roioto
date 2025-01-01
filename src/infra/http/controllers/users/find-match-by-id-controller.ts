import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { UserAlreadyExistsError } from '@/domain/user/application/usecases/errors/user-already-exists-error'
import { MatchPresenter } from '../../presenters/match-presenter'
import { FindMatchByIdUseCase } from '@/domain/user/application/usecases/find-match-by-id'
import { SomethingGoesWrongError } from '@/domain/user/application/usecases/errors/something-goes-wrong'

@Controller('/users/match')
export class FindMatchByIdController {
  constructor(private findMatchById: FindMatchByIdUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const result = await this.findMatchById.execute(id)

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

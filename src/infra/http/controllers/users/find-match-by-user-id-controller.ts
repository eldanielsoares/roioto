import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
} from '@nestjs/common'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { MatchPresenter } from '../../presenters/match-presenter'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { FindMatchByUserIdUseCase } from 'src/domain/user/application/usecases/find-match-by-userId'

@Controller('/users/matches')
export class FindMatchByUserIdController {
  constructor(private findMatchByUserId: FindMatchByUserIdUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const {
      sub: { userId },
    } = user
    const result = await this.findMatchByUserId.execute(userId)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      matches: result.value.matchs.map((match) => MatchPresenter.toHTTP(match)),
    }
  }
}

import { BadRequestException, Controller, Get } from '@nestjs/common'
import { MatchPresenter } from '../../presenters/match-presenter'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FindMatchByUserIdUseCase } from '@/domain/user/application/usecases/find-match-by-userId'
import { SomethingGoesWrongError } from '@/domain/user/application/usecases/errors/something-goes-wrong'

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
        case SomethingGoesWrongError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      matches: result.value.matchs.map((match) => MatchPresenter.toHTTP(match)),
    }
  }
}

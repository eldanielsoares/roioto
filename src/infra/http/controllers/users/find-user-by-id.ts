import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FindUserByIdUseCase } from '@/domain/user/application/usecases/find-user-by-id'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UserPresenter } from '../../presenters/user-presenter'

@Controller('users/me')
export class FindUserByIdController {
  constructor(private readonly findUserByIdUsecase: FindUserByIdUseCase) {}

  @Get()
  async findUserById(@CurrentUser() me: UserPayload) {
    const {
      sub: { userId },
    } = me
    const result = await this.findUserByIdUsecase.execute(userId)

    if (result.isLeft()) throw new BadRequestException()

    return { user: UserPresenter.toHTTP(result.value.user) }
  }
}

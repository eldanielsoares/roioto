import { BadRequestException, Controller, Delete, Get } from '@nestjs/common'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { DeleteUserUseCase } from 'src/domain/user/application/usecases/delete-user'

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUsecase: DeleteUserUseCase) {}

  @Delete()
  async findUserById(@CurrentUser() me: UserPayload) {
    const {
      sub: { userId },
    } = me
    const result = await this.deleteUserUsecase.execute(userId)

    if (result.isLeft()) throw new BadRequestException()

    return { message: 'User deleted successfully' }
  }
}

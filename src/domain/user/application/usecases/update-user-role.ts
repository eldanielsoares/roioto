import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from '@/core/either'
import { UserNotFoundError } from './errors/user-not-found-error'

type CreateUserUseCaseResponse = Either<UserNotFoundError, void>

@Injectable()
export class UpdateUserRoleUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(
    userId: string,
    role: string,
  ): Promise<CreateUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) return left(new UserNotFoundError())

    await this.userRepository.updateUserRole(user.id.toString(), role)

    return right(undefined)
  }
}

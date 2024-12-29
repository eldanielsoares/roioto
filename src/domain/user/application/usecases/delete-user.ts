import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from 'src/core/either'
import { UserNotFoundError } from './errors/user-not-found-error'

type DeleteUserResponse = Either<UserNotFoundError, void>

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<DeleteUserResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) return left(new UserNotFoundError())

    await this.usersRepository.delete(id)

    return right(undefined)
  }
}

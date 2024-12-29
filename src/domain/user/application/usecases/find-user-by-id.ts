import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from 'src/core/either'
import { UserNotFoundError } from './errors/user-not-found-error'
import { User } from '../../enterprise/entities/user'

type FindUserByIdResponse = Either<
  UserNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<FindUserByIdResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) return left(new UserNotFoundError())

    return right({ user })
  }
}

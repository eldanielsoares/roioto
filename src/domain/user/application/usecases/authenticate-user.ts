import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encryption } from '../cryptography/encrypt'
import { Either, left, right } from 'src/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: HashComparer,
    private readonly encryption: Encryption,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) return left(new WrongCredentialsError())

    const isMatchingPassword = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isMatchingPassword) return left(new WrongCredentialsError())

    const accessToken = await this.encryption.encrypt(
      {
        sub: { userId: user.id.toString(), role: user.role.toString() },
      },
      { expiresIn: '1d' },
    )

    return right({ accessToken })
  }
}

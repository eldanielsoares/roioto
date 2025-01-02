import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { Encryption } from '../cryptography/encrypt'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type AuthenticateUserResponse = Either<
  SomethingGoesWrongError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserGoogleUsecase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private encryption: Encryption,
    private readonly hasher: HashGenerator,
  ) {}

  async execute(data: User): Promise<AuthenticateUserResponse> {
    const user = await this.findOrCreateUser(data)

    if (!user.provider || user.provider !== data.provider) {
      return left(new SomethingGoesWrongError())
    }

    return right({
      accessToken: await this.generateAccessToken(user.id.toString()),
    })
  }

  private async findOrCreateUser(data: User): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (!userExists) {
      const newUser = User.create({
        name: data.name,
        email: data.email,
        password: await this.hasher.hash(new UniqueEntityID().toString()),
        provider: 'google',
      })
      return await this.usersRepository.create(newUser)
    }

    return userExists
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return this.encryption.encrypt(
      {
        sub: { userId },
      },
      { expiresIn: '1d' },
    )
  }
}

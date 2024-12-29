import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from 'src/core/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Encryption } from '../cryptography/encrypt'
import { HashGenerator } from '../cryptography/hash-generator'
import { User } from '../../enterprise/entities/user'
import { Match } from '../../enterprise/entities/match'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { MatchRepository } from '../repositories/match.repository'

type FindMatchByIdUseCaseResponse = Either<
  SomethingGoesWrongError,
  {
    matchs: Match[]
  }
>

@Injectable()
export class FindMatchByUserIdUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(userId: string): Promise<FindMatchByIdUseCaseResponse> {
    const matchs = await this.matchRepository.findMatchesByUserId(userId)

    if (!matchs?.length) return left(new SomethingGoesWrongError())

    return right({
      matchs,
    })
  }
}

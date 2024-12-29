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
    match: Match
  }
>

@Injectable()
export class FindMatchByIdUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(id: string): Promise<FindMatchByIdUseCaseResponse> {
    const match = await this.matchRepository.findMatchById(id)

    if (!match) return left(new SomethingGoesWrongError())

    return right({
      match,
    })
  }
}

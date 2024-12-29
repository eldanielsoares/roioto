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

interface CreateMatchUseCaseRequest {
  userId: string
  deckId: string
}

type CreateMatchUseCaseResponse = Either<
  SomethingGoesWrongError,
  {
    match: Match
  }
>

@Injectable()
export class CreateMatchUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(
    data: CreateMatchUseCaseRequest,
  ): Promise<CreateMatchUseCaseResponse> {
    const match = Match.create(data)

    const createdMatch = await this.matchRepository.create(match)

    return right({
      match: createdMatch,
    })
  }
}

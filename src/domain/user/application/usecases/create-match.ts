import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
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

    if (!createdMatch) return left(new SomethingGoesWrongError())

    return right({
      match: createdMatch,
    })
  }
}

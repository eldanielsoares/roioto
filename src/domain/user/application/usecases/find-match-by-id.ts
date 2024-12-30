import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
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

import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
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

    return right({
      matchs: matchs || [],
    })
  }
}

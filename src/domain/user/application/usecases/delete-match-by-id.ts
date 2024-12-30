import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { MatchRepository } from '../repositories/match.repository'

type DeleteMatchByIdUseCaseResponse = Either<SomethingGoesWrongError, void>

@Injectable()
export class DeleteMatchByIdUseCase {
  constructor(private readonly matchRepository: MatchRepository) {}

  async execute(id: string): Promise<DeleteMatchByIdUseCaseResponse> {
    const match = await this.matchRepository.findMatchById(id)

    if (!match) return left(new SomethingGoesWrongError())

    await this.matchRepository.deleteMatch(match.id)

    return right(undefined)
  }
}

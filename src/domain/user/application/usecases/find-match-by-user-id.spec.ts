import { InMemoryMatchesRepository } from 'test/repositories/in-memory-matches-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeMatch } from 'test/factories/make-match'
import { Match } from '../../enterprise/entities/match'
import { FindMatchByUserIdUseCase } from './find-match-by-userId'

let inMemoryMatchRepository: InMemoryMatchesRepository
let sut: FindMatchByUserIdUseCase

describe('Find Match By User Id', () => {
  beforeEach(() => {
    inMemoryMatchRepository = new InMemoryMatchesRepository()
    sut = new FindMatchByUserIdUseCase(inMemoryMatchRepository)
  })

  it('should find a match by user Id', async () => {
    const matchId = new UniqueEntityID()
    const userId = new UniqueEntityID().toString()
    const item = makeMatch({ userId }, matchId)

    inMemoryMatchRepository.items.push(item)

    const result = await sut.execute(userId)

    const { matchs } = result.value as { matchs: Match[] }

    expect(result.isRight()).toBe(true)
    expect(matchs).toHaveLength(1)
  })

  it('should return an empty array if repository returns undefined', async () => {
    const userId = new UniqueEntityID().toString()

    vitest
      .spyOn(inMemoryMatchRepository, 'findMatchesByUserId')
      .mockResolvedValueOnce(undefined)

    const result = await sut.execute(userId)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ matchs: [] })
  })
})

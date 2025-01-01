import { InMemoryMatchesRepository } from 'test/repositories/in-memory-matches-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { makeMatch } from 'test/factories/make-match'
import { FindMatchByIdUseCase } from './find-match-by-id'
import { Match } from '../../enterprise/entities/match'

let inMemoryMatchRepository: InMemoryMatchesRepository
let sut: FindMatchByIdUseCase

describe('Find Match By Id', () => {
  beforeEach(() => {
    inMemoryMatchRepository = new InMemoryMatchesRepository()
    sut = new FindMatchByIdUseCase(inMemoryMatchRepository)
  })

  it('should find a match by Id', async () => {
    const matchId = new UniqueEntityID()
    const item = makeMatch({}, matchId)

    inMemoryMatchRepository.items.push(item)

    const result = await sut.execute(matchId.toString())

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ match: inMemoryMatchRepository.items[0] })
  })

  it('should return error if not found a match', async () => {
    const matchId = new UniqueEntityID()

    const result = await sut.execute(matchId.toString())

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

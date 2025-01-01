import { InMemoryMatchesRepository } from 'test/repositories/in-memory-matches-repository'
import { CreateMatchUseCase } from './create-match'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { Match } from '../../enterprise/entities/match'

let inMemoryMatchRepository: InMemoryMatchesRepository
let sut: CreateMatchUseCase

describe('Create Match', () => {
  beforeEach(() => {
    inMemoryMatchRepository = new InMemoryMatchesRepository()
    sut = new CreateMatchUseCase(inMemoryMatchRepository)
  })

  it('should create a new match', async () => {
    const userId = new UniqueEntityID().toString()
    const deckId = new UniqueEntityID().toString()

    const result = await sut.execute({ userId, deckId })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ match: inMemoryMatchRepository.items[0] })
  })

  it('should return a error if could not create match', async () => {
    vitest.spyOn(inMemoryMatchRepository, 'create').mockResolvedValueOnce(null)

    const userId = new UniqueEntityID().toString()
    const deckId = new UniqueEntityID().toString()

    const result = await sut.execute({ userId, deckId })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

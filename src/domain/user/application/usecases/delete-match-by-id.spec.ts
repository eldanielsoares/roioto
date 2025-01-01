import { InMemoryMatchesRepository } from 'test/repositories/in-memory-matches-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { DeleteMatchByIdUseCase } from './delete-match-by-id'
import { makeMatch } from 'test/factories/make-match'

let inMemoryMatchRepository: InMemoryMatchesRepository
let sut: DeleteMatchByIdUseCase

describe('Delete Match', () => {
  beforeEach(() => {
    inMemoryMatchRepository = new InMemoryMatchesRepository()
    sut = new DeleteMatchByIdUseCase(inMemoryMatchRepository)
  })

  it('should delete a match', async () => {
    const matchId = new UniqueEntityID()
    const match = makeMatch({}, matchId)

    inMemoryMatchRepository.items.push(match)

    const result = await sut.execute(matchId.toString())

    expect(result.isRight()).toBe(true)
    expect(inMemoryMatchRepository.items.length).toBe(0)
  })

  it('should return error if not found a match', async () => {
    const matchId = new UniqueEntityID()

    const result = await sut.execute(matchId.toString())

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

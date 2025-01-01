import { InMemoryMatchesRepository } from 'test/repositories/in-memory-matches-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { makeMatch } from 'test/factories/make-match'
import { UpdateMatchShotsByIdUseCase } from './update-match-shots-by-id'

let inMemoryMatchRepository: InMemoryMatchesRepository
let sut: UpdateMatchShotsByIdUseCase

describe('Update Match Shots By Id', () => {
  beforeEach(() => {
    inMemoryMatchRepository = new InMemoryMatchesRepository()
    sut = new UpdateMatchShotsByIdUseCase(inMemoryMatchRepository)
  })

  it('should update shots by match and card', async () => {
    const matchId = new UniqueEntityID()
    const cardId = new UniqueEntityID()
    const match = makeMatch({}, matchId)

    inMemoryMatchRepository.items.push(match)

    const result = await sut.execute({
      cardId: cardId.toString(),
      matchId: matchId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ match: inMemoryMatchRepository.items[0] })
  })

  it('should return error if not found a match', async () => {
    const cardId = new UniqueEntityID()

    const result = await sut.execute({
      cardId: cardId.toString(),
      matchId: 'matchId',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

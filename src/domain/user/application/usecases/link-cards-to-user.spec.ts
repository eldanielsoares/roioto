import { InMemoryUserCardsRepository } from 'test/repositories/in-memory-users-card-repository'
import { LinkUserCardsToUserUseCase } from './link-cards-to-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserCard } from '../../enterprise/entities/user-card'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryUserCardsRepository: InMemoryUserCardsRepository

let sut: LinkUserCardsToUserUseCase

describe('Link User Cards to User Use Case', () => {
  beforeEach(() => {
    inMemoryUserCardsRepository = new InMemoryUserCardsRepository()
    sut = new LinkUserCardsToUserUseCase(inMemoryUserCardsRepository)
  })

  it('should link user cards to a user', async () => {
    const userId = new UniqueEntityID().toString()
    const deckId = new UniqueEntityID().toString()

    const result = await sut.execute({ userId, deckId, quantity: 5 })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      userCards: inMemoryUserCardsRepository.items,
    })
  })

  it('should return an error if no user cards are linked', async () => {
    vitest
      .spyOn(inMemoryUserCardsRepository, 'linkUserCardsToUser')
      .mockResolvedValueOnce(undefined)

    const result = await sut.execute({
      userId: new UniqueEntityID().toString(),
      deckId: new UniqueEntityID().toString(),
      quantity: 5,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

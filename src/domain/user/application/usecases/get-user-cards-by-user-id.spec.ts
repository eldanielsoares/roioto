import { InMemoryUserCardsRepository } from 'test/repositories/in-memory-users-card-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserCard } from '../../enterprise/entities/user-card'
import { GetUserCardsByUserIdAndDeckIdUseCase } from './get-user-cards-by-user-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryUserCardsRepository: InMemoryUserCardsRepository

let sut: GetUserCardsByUserIdAndDeckIdUseCase

describe('Get User Cards to User Use Case', () => {
  beforeEach(() => {
    inMemoryUserCardsRepository = new InMemoryUserCardsRepository()
    sut = new GetUserCardsByUserIdAndDeckIdUseCase(inMemoryUserCardsRepository)
  })

  it('should return a list of user cards linked to a user', async () => {
    const userId = new UniqueEntityID().toString()
    const deckId = new UniqueEntityID().toString()

    const userCards = UserCard.create({
      userId,
      deckId,
      cardId: new UniqueEntityID().toString(),
    })

    inMemoryUserCardsRepository.items.push(userCards)

    const result = await sut.execute({ userId, deckId })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      userCards: inMemoryUserCardsRepository.items,
    })
  })
  it('should return error if not user cards were found', async () => {
    vitest
      .spyOn(inMemoryUserCardsRepository, 'getUserCardsByUserIdAndDeckId')
      .mockResolvedValueOnce(undefined)

    const userId = new UniqueEntityID().toString()
    const deckId = new UniqueEntityID().toString()

    const result = await sut.execute({ userId, deckId })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

import { InMemoryPurchaseCardsRepository } from 'test/repositories/in-memory-purchase-cards-repository'
import { UpdatePurchaseStatusPackUseCase } from './update-purchase-status-pack'
import { makePurchaseCards } from 'test/factories/make-purchase'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryPurchaseCardsRepository: InMemoryPurchaseCardsRepository

let sut: UpdatePurchaseStatusPackUseCase

describe('Update Purchase Status Pack', () => {
  beforeEach(() => {
    inMemoryPurchaseCardsRepository = new InMemoryPurchaseCardsRepository()
    sut = new UpdatePurchaseStatusPackUseCase(inMemoryPurchaseCardsRepository)
  })

  it('should update the status of the purchase pack', async () => {
    const id = new UniqueEntityID()
    const userId = new UniqueEntityID().toString()
    const packId = new UniqueEntityID().toString()
    const purchasePack = makePurchaseCards(
      {
        packId,
        userId,
        status: 'pending',
        updatedAt: new Date(),
      },
      id,
    )

    inMemoryPurchaseCardsRepository.items.push(purchasePack)

    const result = await sut.execute({
      userId,
      id: id.toString(),
      status: 'approved',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      purchaseCard: inMemoryPurchaseCardsRepository.items[0],
    })
  })
  it('should return error id could not handle a purchase', async () => {
    const id = new UniqueEntityID()
    const userId = new UniqueEntityID().toString()
    const result = await sut.execute({
      userId,
      id: id.toString(),
      status: 'approved',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

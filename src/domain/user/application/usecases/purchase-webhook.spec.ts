import { InMemoryPackRepository } from 'test/repositories/in-memory-pack-repository'
import { InMemoryPurchaseCardsRepository } from 'test/repositories/in-memory-purchase-cards-repository'
import { InMemoryUserCardsRepository } from 'test/repositories/in-memory-users-card-repository'
import { PurchaseWebhookPackUseCase } from './purchase-webhook'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makePurchaseCards } from 'test/factories/make-purchase'
import { makePack } from 'test/factories/make-pack'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryPurchaseCardsRepository: InMemoryPurchaseCardsRepository
let inMemoryUserCardsRepository: InMemoryUserCardsRepository
let inMemoryPackRepository: InMemoryPackRepository
let sut: PurchaseWebhookPackUseCase

describe('Purchase Webhook Pack Use Case', () => {
  beforeEach(() => {
    inMemoryPurchaseCardsRepository = new InMemoryPurchaseCardsRepository()
    inMemoryUserCardsRepository = new InMemoryUserCardsRepository()
    inMemoryPackRepository = new InMemoryPackRepository()
    sut = new PurchaseWebhookPackUseCase(
      inMemoryPurchaseCardsRepository,
      inMemoryUserCardsRepository,
      inMemoryPackRepository,
    )
  })

  it('should process the webhook and update purchase status and link user cards when approved', async () => {
    // Mock purchase data
    const userId = new UniqueEntityID().toString()
    const packId = new UniqueEntityID()
    const deckId = new UniqueEntityID().toString()
    const purchaseCard = makePurchaseCards({
      userId,
      packId: packId.toString(),
      status: 'PENDING',
      updatedAt: new Date(),
    })

    // Add purchase data to the repository
    inMemoryPurchaseCardsRepository.items.push(purchaseCard)

    const pack = makePack({}, packId)
    inMemoryPackRepository.items.push(pack)

    vitest.spyOn(inMemoryUserCardsRepository, 'linkUserCardsToUser')

    const result = await sut.execute({
      paymentId: purchaseCard.id.toString(),
      status: 'APPROVED',
    })

    expect(result.isRight()).toBeTruthy()
  })

  it('should return an error if purchase is not found', async () => {
    const result = await sut.execute({
      paymentId: 'non-existing-id',
      status: 'APPROVED',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

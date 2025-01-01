import { InMemoryPurchaseCardsRepository } from 'test/repositories/in-memory-purchase-cards-repository'
import { ProcessPaymentUseCase } from './process-payment'
import { InMemoryPaymentRepository } from 'test/repositories/in-memory-payment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

let inMemoryPurchaseCardsRepository: InMemoryPurchaseCardsRepository
let inMemoryPaymentRepository: InMemoryPaymentRepository
let sut: ProcessPaymentUseCase

describe('Process payment', () => {
  beforeAll(() => {
    inMemoryPurchaseCardsRepository = new InMemoryPurchaseCardsRepository()
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new ProcessPaymentUseCase(
      inMemoryPaymentRepository,
      inMemoryPurchaseCardsRepository,
    )
  })

  it('should process a payment', async () => {
    const deckId = new UniqueEntityID().toString()
    const userId = new UniqueEntityID().toString()
    const packId = new UniqueEntityID().toString()

    const paymentData = {
      transaction_amount: 1,
      description: 'description',
      payment_method_id: 'pix',
      payer: {},
      installments: 1,
      token: 'token',
      issuer_id: 1,
      deckId,
      userId,
      packId,
    }

    const result = await sut.execute(paymentData)

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toHaveProperty('payment')
    expect(result.value).toHaveProperty('purchaseCards')
  })

  it('should return error on process a payment', async () => {
    vitest
      .spyOn(inMemoryPaymentRepository, 'processPayment')
      .mockResolvedValueOnce(undefined)

    const deckId = new UniqueEntityID().toString()
    const userId = new UniqueEntityID().toString()
    const packId = new UniqueEntityID().toString()

    const paymentData = {
      transaction_amount: 1,
      description: 'description',
      payment_method_id: 'pix',
      payer: {},
      installments: 1,
      token: 'token',
      issuer_id: 1,
      deckId,
      userId,
      packId,
    }

    const result = await sut.execute(paymentData)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
  it('should return error on process a payment if purchase cards not found', async () => {
    vitest
      .spyOn(inMemoryPurchaseCardsRepository, 'purchaseCards')
      .mockResolvedValueOnce(undefined)

    const deckId = new UniqueEntityID().toString()
    const userId = new UniqueEntityID().toString()
    const packId = new UniqueEntityID().toString()

    const paymentData = {
      transaction_amount: 1,
      description: 'description',
      payment_method_id: 'pix',
      payer: {},
      installments: 1,
      token: 'token',
      issuer_id: 1,
      deckId,
      userId,
      packId,
    }

    const result = await sut.execute(paymentData)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(SomethingGoesWrongError)
  })
})

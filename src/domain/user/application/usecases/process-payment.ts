import { Injectable } from '@nestjs/common'
import {
  Payment,
  PaymentPreferences,
  ProcessPayment,
} from '../payments/payment'
import { PurchaseCardsRepository } from '../repositories/purchase-cards-repository'
import { PurchaseCards } from '../../enterprise/entities/purchase-cards'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

type PurchaseCardsRequest = ProcessPayment & {
  userId: string
  packId: string
  deckId: string
}

type ProcessPaymentResponse = Either<
  SomethingGoesWrongError,
  {
    payment: unknown
    purchaseCards: PurchaseCards
  }
>

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    private payment: Payment,
    private readonly purchaseCards: PurchaseCardsRepository,
  ) {}

  async execute(data: PurchaseCardsRequest): Promise<ProcessPaymentResponse> {
    const { deckId, userId, packId, ...paymentData } = data
    const payment = await this.payment.processPayment(paymentData)

    const purchaseCard = PurchaseCards.create({
      deckId,
      userId,
      packId,
      status: 'pending',
      updatedAt: new Date(),
    })
    const purchaseCards = await this.purchaseCards.purchaseCards(purchaseCard)

    if (!purchaseCards) return left(new SomethingGoesWrongError())

    return right({
      payment,
      purchaseCards,
    })
  }
}

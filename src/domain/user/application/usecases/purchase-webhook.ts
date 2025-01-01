import { Injectable } from '@nestjs/common'
import { UserCardsRepository } from '../repositories/user-card-repository'
import { PurchaseCardsRepository } from '../repositories/purchase-cards-repository'
import { PurchaseCards } from '../../enterprise/entities/purchase-cards'
import { PackRepository } from 'src/domain/pack/application/repositories/pack-repository'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

type PurchaseWebhookRequest = {
  paymentId: string
  status: string
}

type UpdatePurchaseUseCaseResponse = Either<SomethingGoesWrongError, void>

@Injectable()
export class PurchaseWebhookPackUseCase {
  constructor(
    private readonly purchaseRepository: PurchaseCardsRepository,
    private readonly userCardRepository: UserCardsRepository,
    private readonly packRepository: PackRepository,
  ) {}

  async execute(
    data: PurchaseWebhookRequest,
  ): Promise<UpdatePurchaseUseCaseResponse> {
    const { paymentId, status } = data
    const purchase = await this.purchaseRepository.findPurchaseById(paymentId)

    if (!purchase) return left(new SomethingGoesWrongError())

    const purchaseCard = PurchaseCards.create({
      userId: purchase.userId,
      packId: purchase.packId,
      status,
      updatedAt: new Date(),
    })

    await this.purchaseRepository.updatePurchaseCards(
      purchase.packId,
      purchaseCard,
    )

    if (status === 'APPROVED') {
      const pack = await this.packRepository.findById(purchase.packId)
      await this.userCardRepository.linkUserCardsToUser({
        userId: purchase.userId,
        deckId: purchase.deckId,
        quantity: pack.quantity,
      })
    }

    return right(undefined)
  }
}

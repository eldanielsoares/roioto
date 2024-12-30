import { PurchaseCards } from 'src/domain/user/enterprise/entities/purchase-cards'

export class PurchaseCardsPresenter {
  static toHTTP(purchaseCards: PurchaseCards) {
    return {
      id: purchaseCards.id.toString(),
      userId: purchaseCards.userId,
      packId: purchaseCards.packId,
      status: purchaseCards.status,
      paymentId: purchaseCards.paymentId,
      createdAt: purchaseCards.createdAt,
      updatedAt: purchaseCards.updatedAt,
    }
  }
}

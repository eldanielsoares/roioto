import { PurchaseCards } from '../../enterprise/entities/purchase-cards'

export abstract class PurchaseCardsRepository {
  abstract purchaseCards(data: PurchaseCards): Promise<PurchaseCards>
  abstract updatePurchaseCards(
    id: string,
    data: PurchaseCards,
  ): Promise<PurchaseCards>
  abstract findPurchaseById(id: string): Promise<PurchaseCards>
}

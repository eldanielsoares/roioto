import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PurchaseCardsRepository } from '@/domain/user/application/repositories/purchase-cards-repository'
import { PurchaseCards } from '@/domain/user/enterprise/entities/purchase-cards'

export class InMemoryPurchaseCardsRepository
  implements PurchaseCardsRepository
{
  public items: PurchaseCards[] = []
  async purchaseCards(data: PurchaseCards): Promise<PurchaseCards> {
    const purchaseCard = PurchaseCards.create(data)
    this.items.push(purchaseCard)
    return purchaseCard
  }
  async updatePurchaseCards(
    id: string,
    data: PurchaseCards,
  ): Promise<PurchaseCards> {
    const purchaseCardIndex = this.items.findIndex(
      (purchase) => purchase.id.toString() === id,
    )

    if (purchaseCardIndex === -1) return undefined

    return (this.items[purchaseCardIndex] = PurchaseCards.create(
      data,
      this.items[purchaseCardIndex].id,
    ))
  }
  async findPurchaseById(id: string): Promise<PurchaseCards> {
    return this.items.find((purchase) => purchase.id.toString() === id)
  }
}

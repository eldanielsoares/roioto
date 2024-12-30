import { Prisma, Purchase as PrismaPurchase } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Pack } from 'src/domain/pack/enterprise/entities/pack'
import { Match } from 'src/domain/user/enterprise/entities/match'
import { PurchaseCards } from 'src/domain/user/enterprise/entities/purchase-cards'

export class PrismaPurchaseCardshMapper {
  static toDomain(raw: PrismaPurchase): PurchaseCards {
    return PurchaseCards.create(
      {
        userId: raw.userId,
        deckId: raw.deckId,
        packId: raw.packId,
        status: raw.status,
        paymentId: raw.paymentId,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    purchaseCard: PurchaseCards,
  ): Prisma.PurchaseUncheckedCreateInput {
    return {
      id: purchaseCard.id.toString(),
      deckId: purchaseCard.deckId,
      userId: purchaseCard.userId,
      status: purchaseCard.status,
      paymentId: purchaseCard.paymentId,
      packId: purchaseCard.packId,
      createdAt: purchaseCard.createdAt,
    }
  }
}

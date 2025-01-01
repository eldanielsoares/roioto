import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  PurchaseCards,
  PurchaseCardsProps,
} from '@/domain/user/enterprise/entities/purchase-cards'
import { PrismaPurchaseCardshMapper } from '@/infra/database/prisma/mappers/prisma-purchase-cards-mapper'

export function makePurchaseCards(
  override: Partial<PurchaseCardsProps> = {},
  id?: UniqueEntityID,
) {
  const user = PurchaseCards.create(
    {
      packId: new UniqueEntityID().toString(),
      userId: new UniqueEntityID().toString(),
      status: 'pending',
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(
    data: Partial<PurchaseCardsProps> = {},
  ): Promise<PurchaseCards> {
    const purchaseCards = makePurchaseCards(data)

    await this.prisma.purchase.create({
      data: PrismaPurchaseCardshMapper.toPrisma(purchaseCards),
    })

    return purchaseCards
  }
}

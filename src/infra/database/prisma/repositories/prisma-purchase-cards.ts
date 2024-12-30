import { Injectable } from '@nestjs/common'
import { PurchaseCardsRepository } from 'src/domain/user/application/repositories/purchase-cards-repository'
import { PurchaseCards } from 'src/domain/user/enterprise/entities/purchase-cards'
import { PrismaPurchaseCardshMapper } from '../mappers/prisma-purchase-cards-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPurchaseCardsRepository implements PurchaseCardsRepository {
  constructor(private prisma: PrismaService) {}
  async purchaseCards(data: PurchaseCards): Promise<PurchaseCards> {
    const purchaseCard = PrismaPurchaseCardshMapper.toPrisma(data)

    const purchasedCards = await this.prisma.purchase.create({
      data: purchaseCard,
    })

    return PrismaPurchaseCardshMapper.toDomain(purchasedCards)
  }
  async updatePurchaseCards(
    id: string,
    data: PurchaseCards,
  ): Promise<PurchaseCards> {
    const purchaseCard = PrismaPurchaseCardshMapper.toPrisma(data)

    const purchasedCards = await this.prisma.purchase.update({
      where: { id },
      data: purchaseCard,
    })

    return PrismaPurchaseCardshMapper.toDomain(purchasedCards)
  }
  async findPurchaseById(id: string): Promise<PurchaseCards> {
    const purchaseCard = await this.prisma.purchase.findFirst({ where: { id } })

    return PrismaPurchaseCardshMapper.toDomain(purchaseCard)
  }
}

import { CardRepository } from '@/domain/cards/application/repositories/card-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Card } from '@/domain/cards/enterprise/entities/card'
import { PrismaCardMapper } from '../mappers/prisma-card-mapper'

@Injectable()
export class PrismaCardRepository implements CardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveBatch(cards: Card[]): Promise<void> {
    const cardsData = cards.map((card) => PrismaCardMapper.toPrisma(card))

    await this.prisma.card.createMany({
      data: cardsData,
    })
  }
}

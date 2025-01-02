import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DeckRepository } from '@/domain/cards/application/repositories/deck-repository'
import { Deck } from '@/domain/cards/enterprise/entities/deck'
import { PrismaDeckMapper } from '../mappers/prisma-deck-mapper'

@Injectable()
export class PrismaDeckRepository implements DeckRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveBatch(decks: Deck[]): Promise<void> {
    const deckData = decks.map((deck) => PrismaDeckMapper.toPrisma(deck))

    await this.prisma.deck.createMany({
      data: deckData,
    })
  }
}

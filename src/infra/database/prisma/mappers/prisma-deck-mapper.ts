import { Prisma, Deck as PrismaDeck } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Deck } from '@/domain/cards/enterprise/entities/deck'

export class PrismaDeckMapper {
  static toDomain(raw: PrismaDeck): Deck {
    return Deck.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(deck: Deck): Prisma.DeckUncheckedCreateInput {
    return {
      id: deck.id.toString(),
      name: deck.name,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    }
  }
}

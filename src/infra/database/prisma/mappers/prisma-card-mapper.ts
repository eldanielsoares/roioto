import { Prisma, Card as PrismaCard } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Card } from '@/domain/cards/enterprise/entities/card'

export class PrismaCardMapper {
  static toDomain(raw: PrismaCard): Card {
    return Card.create(
      {
        categoryId: raw.categoryId,
        description: raw.description,
        deckId: raw.deckId,
        image: raw.image,
        weight: raw.weight,
        shots: raw.shots,
        isFree: raw.isFree,
        level: raw.level,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(card: Card): Prisma.CardUncheckedCreateInput {
    return {
      id: card.id.toString(),
      categoryId: card.categoryId,
      description: card.description,
      deckId: card.deckId,
      image: card.image,
      level: card.level,
      weight: card.weight,
      shots: card.shots,
      isFree: card.isFree,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    }
  }
}

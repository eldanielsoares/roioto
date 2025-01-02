import { Prisma, UserCard as PrismaUserCard } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Card, UserCard } from '@/domain/user/enterprise/entities/user-card'

type MapperResponse = PrismaUserCard & {
  card?: Card
}

export class PrismaUserCardsMapper {
  static toDomain(raw: MapperResponse): UserCard {
    return UserCard.create(
      {
        deckId: new UniqueEntityID(raw.deckId).toString(),
        userId: new UniqueEntityID(raw.userId).toString(),
        cardId: new UniqueEntityID(raw.cardId).toString(),
        card: raw.card
          ? {
              id: raw.card.id,
              categoryId: raw.card.categoryId,
              description: raw.card.description,
              image: raw.card.image,
              weight: raw.card.weight,
              shots: raw.card.shots,
              isFree: raw.card.isFree,
              level: raw.card.level,
              deckId: raw.card.deckId || undefined,
              createdAt: raw.card.createdAt,
              updatedAt: raw.card.updatedAt,
              packId: raw.card.packId || undefined,
            }
          : undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(userCard: UserCard): Prisma.UserCardUncheckedCreateInput {
    return {
      id: userCard.id.toString(),
      userId: userCard.userId.toString(),
      deckId: userCard.deckId.toString(),
      cardId: userCard.cardId.toString(),
    }
  }
}

import { Card, Prisma, UserCard as PrismaUserCard } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { UserCard } from 'src/domain/user/enterprise/entities/user-card'

type MapperResponse = PrismaUserCard & {
  card?: Card
}

export class PrismaUserCardsMapper {
  static toDomain(raw: MapperResponse): UserCard {
    return UserCard.create(
      {
        deckId: new UniqueEntityID(raw.deckId),
        userId: new UniqueEntityID(raw.userId),
        cardId: new UniqueEntityID(raw.cardId),
        card: raw.card
          ? {
              id: new UniqueEntityID(raw.card.id),
              categoryId: new UniqueEntityID(raw.card.categoryId),
              description: raw.card.description,
              image: raw.card.image,
              weight: raw.card.weight,
              shots: raw.card.shots,
              isFree: raw.card.isFree,
              level: raw.card.level,
              deckId: raw.card.deckId
                ? new UniqueEntityID(raw.card.deckId)
                : undefined,
              createdAt: raw.card.createdAt,
              updatedAt: raw.card.updatedAt,
              packId: raw.card.packId
                ? new UniqueEntityID(raw.card.packId)
                : undefined,
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

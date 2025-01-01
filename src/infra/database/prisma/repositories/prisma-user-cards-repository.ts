import { Injectable } from '@nestjs/common'
import {
  LinkUserCardsToUser,
  UserCardsRepository,
} from '@/domain/user/application/repositories/user-card-repository'
import { UserCard } from '@/domain/user/enterprise/entities/user-card'
import { PrismaService } from '../prisma.service'
import { Prisma } from '@prisma/client'
import { PrismaUserCardsMapper } from '../mappers/prisma-user-cards-mapper'

@Injectable()
export class PrismaUserCardsRepository implements UserCardsRepository {
  constructor(private prisma: PrismaService) {}
  async linkUserCardsToUser({
    deckId,
    userId,
    quantity = 10,
  }: LinkUserCardsToUser): Promise<UserCard[]> {
    const cardsToAssign = await this.prisma.$queryRaw<{ id: string }[]>(
      Prisma.sql`
      SELECT c.id
      FROM cards c
      LEFT JOIN userCards uc ON c.id = uc.card_id AND uc.user_id = ${userId}
      WHERE c.deck_id = ${deckId}
        AND uc.card_id IS NULL
      ORDER BY RANDOM()
      LIMIT ${quantity};
    `,
    )

    const cardsAssigned = cardsToAssign.map((card) => ({
      userId: userId,
      cardId: card.id,
      deckId,
    }))

    await this.prisma.userCard.createMany({
      data: [...cardsAssigned],
    })

    const createdCards = await this.prisma.userCard.findMany({
      where: {
        userId: userId,
        cardId: {
          in: cardsToAssign.map((card) => card.id),
        },
      },
    })

    const domainUserCards = createdCards.map((card) =>
      PrismaUserCardsMapper.toDomain(card),
    )
    return domainUserCards
  }
  async getUserCardsByUserIdAndDeckId({
    userId,
    deckId,
  }: {
    userId: string
    deckId: string
  }): Promise<UserCard[]> {
    const userCards = await this.prisma.userCard.findMany({
      where: { userId, deckId },
      include: {
        card: true,
      },
    })

    return userCards.map((userCard) => PrismaUserCardsMapper.toDomain(userCard))
  }
}

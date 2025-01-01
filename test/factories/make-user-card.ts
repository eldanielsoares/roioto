import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  UserCard,
  UserCardProps,
} from '@/domain/user/enterprise/entities/user-card'
import { PrismaUserCardsMapper } from '@/infra/database/prisma/mappers/prisma-user-cards-mapper'

export function makeUserCards(
  override: Partial<UserCardProps> = {},
  id?: UniqueEntityID,
) {
  const userCard = UserCard.create(
    {
      cardId: new UniqueEntityID().toString(),
      deckId: new UniqueEntityID().toString(),
      userId: new UniqueEntityID().toString(),
      ...override,
    },
    id,
  )

  return userCard
}

@Injectable()
export class MatchFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUserCards(
    data: Partial<UserCardProps> = {},
  ): Promise<UserCard> {
    const userCards = makeUserCards(data)

    await this.prisma.userCard.create({
      data: PrismaUserCardsMapper.toPrisma(userCards),
    })

    return userCards
  }
}

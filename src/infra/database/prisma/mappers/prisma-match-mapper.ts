import { Prisma, Match as PrismaMatch } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Match } from '@/domain/user/enterprise/entities/match'

export class PrismaMatchMapper {
  static toDomain(raw: PrismaMatch): Match {
    return Match.create(
      {
        userId: raw.userId,
        deckId: raw.deckId,
        shots: raw.shots,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(match: Match): Prisma.MatchUncheckedCreateInput {
    return {
      id: match.id.toString(),
      deckId: match.deckId,
      userId: match.userId,
      shots: match.shots,
      createdAt: match.createdAt,
      updatedAt: match.updatedAt,
    }
  }
}

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Match, MatchProps } from '@/domain/user/enterprise/entities/match'
import { PrismaMatchMapper } from '@/infra/database/prisma/mappers/prisma-match-mapper'

export function makeMatch(
  override: Partial<MatchProps> = {},
  id?: UniqueEntityID,
) {
  const match = Match.create(
    {
      userId: new UniqueEntityID().toString(),
      deckId: new UniqueEntityID().toString(),
      shots: 1,
      ...override,
    },
    id,
  )

  return match
}

@Injectable()
export class MatchFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMatch(data: Partial<MatchProps> = {}): Promise<Match> {
    const match = makeMatch(data)

    await this.prisma.match.create({
      data: PrismaMatchMapper.toPrisma(match),
    })

    return match
  }
}

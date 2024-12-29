import { Injectable } from '@nestjs/common'
import { MatchRepository } from 'src/domain/user/application/repositories/match.repository'
import { PrismaMatchMapper } from '../mappers/prisma-match-mapper'
import { PrismaService } from '../prisma.service'
import { Match } from 'src/domain/user/enterprise/entities/match'

@Injectable()
export class PrismaMatchesRepository implements MatchRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: Match): Promise<Match> {
    const match = PrismaMatchMapper.toPrisma(data)

    const savedMatch = await this.prisma.match.create({ data: match })

    return PrismaMatchMapper.toDomain(savedMatch)
  }
  async findMatchesByUserId(userId: string): Promise<any[]> {
    const matches = await this.prisma.match.findMany({ where: { userId } })

    if (!matches?.length) return null

    return matches.map((match) => PrismaMatchMapper.toDomain(match))
  }
  async findMatchById(id: string): Promise<any> {
    const match = await this.prisma.match.findFirst({ where: { id } })

    if (!match) return null

    return PrismaMatchMapper.toDomain(match)
  }

  async updateMatchShots(data: {
    cardId: string
    matchId: string
  }): Promise<Match> {
    const { cardId, matchId } = data

    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
    })

    const match = await this.prisma.match.update({
      where: { id: matchId },
      data: {
        shots: {
          increment: card.shots ?? 1,
        },
      },
    })

    return PrismaMatchMapper.toDomain(match)
  }
  async deleteMatch(id: string): Promise<void> {
    await this.prisma.match.delete({ where: { id } })
  }
}

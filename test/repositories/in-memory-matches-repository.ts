import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MatchRepository } from '@/domain/user/application/repositories/match.repository'
import { Match } from '@/domain/user/enterprise/entities/match'

export class InMemoryMatchesRepository implements MatchRepository {
  public items: Match[] = []

  async create(data: Match): Promise<Match> {
    this.items.push(data)

    return data
  }
  async findMatchesByUserId(userId: string): Promise<Match[]> {
    return this.items.filter((match) => match.userId === userId)
  }
  async findMatchById(id: string): Promise<Match> {
    return this.items.find((match) => match.id.toString() === id)
  }
  async updateMatchShots(data: {
    cardId: string
    matchId: string
  }): Promise<Match> {
    const matchIndex = this.items.findIndex(
      (match) => match.id.toString() === data.matchId,
    )

    if (matchIndex === -1) return null

    const deckId = new UniqueEntityID().toString()
    const userId = new UniqueEntityID().toString()

    return (this.items[matchIndex] = Match.create({ deckId, shots: 5, userId }))
  }
  async deleteMatch(id: string): Promise<void> {
    const matchIndex = this.items.findIndex(
      (match) => match.id.toString() === id,
    )

    if (matchIndex === -1) return null

    this.items.splice(matchIndex, 1)
  }
}

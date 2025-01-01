import { Match } from '../../enterprise/entities/match'

export abstract class MatchRepository {
  abstract create(data: Match): Promise<Match>
  abstract findMatchesByUserId(userId: string): Promise<Match[] | null>
  abstract findMatchById(id: string): Promise<Match | null>
  abstract updateMatchShots(data: {
    cardId: string
    matchId: string
  }): Promise<Match>
  abstract deleteMatch(id: string): Promise<void>
}

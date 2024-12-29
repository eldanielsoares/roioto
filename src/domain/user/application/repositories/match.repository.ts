import { Match } from '../../enterprise/entities/match'

export abstract class MatchRepository {
  abstract create(data: Match): Promise<Match>
  abstract findMatchesByUserId(userId: string): Promise<any[]>
  abstract findMatchById(id: string): Promise<any | undefined>
  abstract updateMatchShots(data: {
    cardId: string
    matchId: string
  }): Promise<any>
  abstract deleteMatch(id: string): Promise<void>
}

import { Match } from 'src/domain/user/enterprise/entities/match'

export class MatchPresenter {
  static toHTTP(match: Match) {
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

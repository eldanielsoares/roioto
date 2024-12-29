import { UserCard } from '../../enterprise/entities/user-card'

export type LinkUserCardsToUser = {
  userId: string
  deckId: string
  quantity?: number
}

export abstract class UserCardsRepository {
  abstract linkUserCardsToUser(data: LinkUserCardsToUser): Promise<UserCard[]>
  abstract getUserCardsByUserIdAndDeckId({
    userId,
    deckId,
  }: {
    userId: string
    deckId: string
  }): Promise<UserCard[]>
}

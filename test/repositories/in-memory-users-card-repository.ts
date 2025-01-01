import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvents } from '@/core/events/domain-events'
import {
  LinkUserCardsToUser,
  UserCardsRepository,
} from '@/domain/user/application/repositories/user-card-repository'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { User } from '@/domain/user/enterprise/entities/user'
import { UserCard } from '@/domain/user/enterprise/entities/user-card'

export class InMemoryUserCardsRepository implements UserCardsRepository {
  public items: UserCard[] = []

  async linkUserCardsToUser(data: LinkUserCardsToUser): Promise<UserCard[]> {
    for (let i = 0; i < data.quantity; i++) {
      const userCard = UserCard.create({
        userId: data.userId,
        deckId: data.deckId,
        cardId: new UniqueEntityID().toString(),
      })
      this.items.push(userCard)
    }

    return this.items
  }
  async getUserCardsByUserIdAndDeckId({
    userId,
    deckId,
  }: {
    userId: string
    deckId: string
  }): Promise<UserCard[]> {
    return this.items.filter(
      (item) => item.userId === userId && item.deckId === deckId,
    )
  }
}

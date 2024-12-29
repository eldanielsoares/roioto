import { AggregateRoot } from 'src/core/entities/aggregate-root'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export type Card = {
  id: UniqueEntityID
  categoryId: UniqueEntityID
  description: string
  image: string
  weight: number
  shots: number
  isFree: boolean
  level: number
  deckId: UniqueEntityID
  createdAt: Date
  updatedAt: Date
  packId?: UniqueEntityID
}

export type UserCardProps = {
  userId: UniqueEntityID
  cardId: UniqueEntityID
  deckId: UniqueEntityID
  createdAt?: Date
  updatedAt?: Date
  card?: Card
}

export class UserCard extends AggregateRoot<UserCardProps> {
  get userId() {
    return this.props.userId
  }

  get cardId() {
    return this.props.cardId
  }

  get deckId() {
    return this.props.deckId
  }

  get card() {
    return this.props.card
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserCardProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const userCardId = id ?? new UniqueEntityID()
    const userCard = new UserCard(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      userCardId,
    )

    return userCard
  }
}

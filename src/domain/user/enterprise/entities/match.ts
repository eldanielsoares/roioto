import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type MatchProps = {
  userId: string
  deckId: string
  shots?: number
  createdAt?: Date
  updatedAt?: Date
}

export class Match extends AggregateRoot<MatchProps> {
  get userId() {
    return this.props.userId.toString()
  }

  get deckId() {
    return this.props.deckId.toString()
  }

  get shots() {
    return this.props.shots
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

  static create(props: Optional<MatchProps, 'createdAt'>, id?: UniqueEntityID) {
    const matchId = id ?? new UniqueEntityID()
    const match = new Match(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      matchId,
    )

    return match
  }
}

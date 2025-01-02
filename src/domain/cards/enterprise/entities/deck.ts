import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@prisma/client/runtime/library'

export type DeckProps = {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class Deck extends AggregateRoot<DeckProps> {
  get name() {
    return this.props.name
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

  static create(props: Optional<DeckProps, 'createdAt'>, id?: UniqueEntityID) {
    const deckId = id ?? new UniqueEntityID()
    const deck = new Deck(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      deckId,
    )

    return deck
  }
}

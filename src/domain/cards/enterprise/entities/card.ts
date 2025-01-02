import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@prisma/client/runtime/library'

export type CardProps = {
  categoryId: string
  description: string
  image: string
  weight: number
  shots: number
  isFree: boolean
  level: number
  deckId?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Card extends AggregateRoot<CardProps> {
  get categoryId() {
    return this.props.categoryId
  }

  get description() {
    return this.props.description
  }

  get image() {
    return this.props.image
  }

  get weight() {
    return this.props.weight
  }

  get shots() {
    return this.props.shots
  }

  get level() {
    return this.props.level
  }

  get isFree() {
    return this.props.isFree
  }

  get deckId() {
    return this.props.deckId
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

  static create(props: Optional<CardProps, 'createdAt'>, id?: UniqueEntityID) {
    const cardId = id ?? new UniqueEntityID()
    const card = new Card(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      cardId,
    )

    return card
  }
}

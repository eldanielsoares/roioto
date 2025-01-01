import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'

export type PackProps = {
  name: string
  price: number
  quantity: number
  createdAt?: Date
  updatedAt?: Date
}

export class Pack extends AggregateRoot<PackProps> {
  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get quantity() {
    return this.props.quantity
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

  static create(props: Optional<PackProps, 'createdAt'>, id?: UniqueEntityID) {
    const packId = id ?? new UniqueEntityID()
    const pack = new Pack(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      packId,
    )

    return pack
  }
}

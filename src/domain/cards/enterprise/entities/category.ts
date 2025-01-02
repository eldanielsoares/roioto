import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@prisma/client/runtime/library'

export type CategoryProps = {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class Category extends AggregateRoot<CategoryProps> {
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

  static create(
    props: Optional<CategoryProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const categoryId = id ?? new UniqueEntityID()
    const category = new Category(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      categoryId,
    )

    return category
  }
}

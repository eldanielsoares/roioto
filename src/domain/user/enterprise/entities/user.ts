import { AggregateRoot } from 'src/core/entities/aggregate-root'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export type UserProps = {
  name: string
  email: string
  password: string
  level?: number
  createdAt?: Date
  updatedAt?: Date
}

export class User extends AggregateRoot<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get level() {
    return this.props.level
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

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const userId = id ?? new UniqueEntityID()
    const user = new User(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      userId,
    )

    return user
  }
}

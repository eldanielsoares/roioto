import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this || entity.id === this._id) return true

    return false
  }
}

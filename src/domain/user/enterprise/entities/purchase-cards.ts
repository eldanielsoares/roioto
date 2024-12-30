import { AggregateRoot } from 'src/core/entities/aggregate-root'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export type PurchaseCardsProps = {
  userId: string
  packId: string
  deckId?: string
  status: string
  paymentId?: string
  createdAt?: Date
  updatedAt?: Date
}

export class PurchaseCards extends AggregateRoot<PurchaseCardsProps> {
  get userId() {
    return this.props.userId
  }

  get packId() {
    return this.props.packId
  }

  get deckId() {
    return this.props.deckId
  }

  get status() {
    return this.props.status
  }
  get paymentId() {
    return this.props.status
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
    props: Optional<PurchaseCardsProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const purchaseId = id ?? new UniqueEntityID()
    const purchaseCard = new PurchaseCards(
      {
        ...props,
        createdAt: props?.createdAt ?? new Date(),
      },
      purchaseId,
    )

    return purchaseCard
  }
}

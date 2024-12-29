import { UniqueEntityID } from '../entities/unique-entity-id'

export interface DomainEvent {
  occuretAt: Date
  getAggregateId: UniqueEntityID
}

import { Card } from '../../enterprise/entities/card'

export abstract class CardRepository {
  abstract saveBatch(data: Card[]): Promise<void>
}

import { Card } from '../../enterprise/entities/card'

export abstract class CardJob {
  abstract add(data: any[]): Promise<void>
}

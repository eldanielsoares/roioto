import { CardProps } from '../../enterprise/entities/card'

export abstract class CardQueue {
  abstract add(data: CardProps[]): Promise<void>
}

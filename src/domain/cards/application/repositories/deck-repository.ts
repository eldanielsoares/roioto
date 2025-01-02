import { Deck } from '../../enterprise/entities/deck'

export abstract class DeckRepository {
  abstract saveBatch(data: Deck[]): Promise<void>
}

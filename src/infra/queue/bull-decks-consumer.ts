import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { DECK_QUEUE, DECK_QUEUE_CONSUMER } from './consts/queue'
import { Deck, DeckProps } from '@/domain/cards/enterprise/entities/deck'
import { DeckRepository } from '@/domain/cards/application/repositories/deck-repository'

@Processor(DECK_QUEUE)
export class BullDecksConsumer {
  constructor(private readonly decksRepository: DeckRepository) {}

  @Process(DECK_QUEUE_CONSUMER)
  async handle(job: Job<DeckProps[]>) {
    const decks = job.data.map((data) =>
      Deck.create(
        {
          name: data.name,
          image: data.image,
          updatedAt: new Date(),
        },
        new UniqueEntityID(),
      ),
    )

    console.log(`Processing ${decks.length} decks...`)
    await this.decksRepository.saveBatch(decks)
    console.log(`Processed ${decks.length} decks.`)
  }
}

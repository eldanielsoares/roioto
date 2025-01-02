import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CardRepository } from '@/domain/cards/application/repositories/card-repository'
import { Card, CardProps } from '@/domain/cards/enterprise/entities/card'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { FILE_QUEUE, FILE_QUEUE_CONSUMER } from './consts/queue'

@Processor(FILE_QUEUE)
export class BullCardsConsumer {
  constructor(private readonly cardRepository: CardRepository) {}

  @Process(FILE_QUEUE_CONSUMER)
  async handle(job: Job<CardProps[]>) {
    const cards = job.data.map((data) =>
      Card.create(
        {
          categoryId: data.categoryId,
          description: data.description,
          deckId: data.deckId,
          image: data.image,
          weight: data.weight,
          shots: data.shots,
          isFree: data.isFree,
          level: data.level,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        new UniqueEntityID(),
      ),
    )

    console.log(`Processing ${cards.length} cards...`)
    await this.cardRepository.saveBatch(cards)
    console.log(`Processed ${cards.length} cards.`)
  }
}

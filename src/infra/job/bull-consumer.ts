import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CardRepository } from '@/domain/cards/application/repositories/card-repository'
import { Card, CardProps } from '@/domain/cards/enterprise/entities/card'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('process_file_job')
export class BullConsumer {
  constructor(private readonly cardRepository: CardRepository) {}

  @Process('process_file')
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

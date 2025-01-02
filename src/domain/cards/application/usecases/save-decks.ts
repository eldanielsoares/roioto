import { Injectable } from '@nestjs/common'
import { QueueRepository } from '../queue/queue'
import { ProcessFile } from '../process-file/process-file'
import { DECK_QUEUE, DECK_QUEUE_CONSUMER } from '@/infra/queue/consts/queue'

@Injectable()
export class SaveDecksUsecase {
  constructor(
    private Queue: QueueRepository,
    private processFileRepository: ProcessFile,
  ) {}

  async execute(data: Buffer): Promise<void> {
    const decks = await this.processFileRepository.processFile(data)

    return this.Queue.add(DECK_QUEUE, DECK_QUEUE_CONSUMER, decks)
  }
}

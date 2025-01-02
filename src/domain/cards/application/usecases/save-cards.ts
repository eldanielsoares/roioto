import { Injectable } from '@nestjs/common'
import { QueueRepository } from '../queue/queue'
import { ProcessFile } from '../process-file/process-file'
import { FILE_QUEUE_CONSUMER } from '@/infra/queue/consts/queue'

@Injectable()
export class SaveCardsUsecase {
  constructor(
    private Queue: QueueRepository,
    private processFileRepository: ProcessFile,
  ) {}

  async execute(data: Buffer): Promise<void> {
    const cards = await this.processFileRepository.processFile(data)

    return this.Queue.add(FILE_QUEUE_CONSUMER, cards)
  }
}

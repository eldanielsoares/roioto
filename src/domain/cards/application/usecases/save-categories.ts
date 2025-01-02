import { Injectable } from '@nestjs/common'
import { QueueRepository } from '../queue/queue'
import { ProcessFile } from '../process-file/process-file'
import {
  CATEGORY_QUEUE,
  CATEGORY_QUEUE_CONSUMER,
} from '@/infra/queue/consts/queue'

@Injectable()
export class SaveCategoriesUsecase {
  constructor(
    private Queue: QueueRepository,
    private processFileRepository: ProcessFile,
  ) {}

  async execute(data: Buffer): Promise<void> {
    const categories = await this.processFileRepository.processFile(data)

    return this.Queue.add(CATEGORY_QUEUE, CATEGORY_QUEUE_CONSUMER, categories)
  }
}

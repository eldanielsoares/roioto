import { QueueRepository } from '@/domain/cards/application/queue/queue'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { FILE_QUEUE, FILE_QUEUE_CONSUMER } from './consts/queue'

@Injectable()
export class BullProcessor implements QueueRepository {
  constructor(@InjectQueue(FILE_QUEUE) private queue: Queue) {}
  async add<T>(queueConsumerName: string, data: T[]): Promise<void> {
    await this.queue.add(queueConsumerName, data)
    console.log('added to queue')
  }
}

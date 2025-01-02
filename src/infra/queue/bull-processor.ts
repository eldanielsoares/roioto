import { QueueRepository } from '@/domain/cards/application/queue/queue'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { CATEGORY_QUEUE, DECK_QUEUE, FILE_QUEUE } from './consts/queue'

@Injectable()
export class BullProcessor implements QueueRepository {
  constructor(
    @InjectQueue(FILE_QUEUE) private fileQueue: Queue,
    @InjectQueue(CATEGORY_QUEUE) private categoryQueue: Queue,
    @InjectQueue(DECK_QUEUE) private deckQueue: Queue,
  ) {}

  getQueue(name: string): Queue {
    const queue = {
      [FILE_QUEUE]: this.fileQueue,
      [CATEGORY_QUEUE]: this.categoryQueue,
      [DECK_QUEUE]: this.deckQueue,
    }

    return queue[name] || this.fileQueue
  }

  async add<T>(
    queueName: string,
    queueConsumerName: string,
    data: T[],
  ): Promise<void> {
    const queue = this.getQueue(queueName)

    await queue.add(queueConsumerName, data)
    console.log(`added ${queueConsumerName} to queue`)
  }
}

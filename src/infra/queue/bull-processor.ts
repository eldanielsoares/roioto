import { CardQueue } from '@/domain/cards/application/queue/card-queue'
import { CardProps } from '@/domain/cards/enterprise/entities/card'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { FILE_QUEUE, FILE_QUEUE_CONSUMER } from './consts/queue'

@Injectable()
export class BullProcessor implements CardQueue {
  constructor(@InjectQueue(FILE_QUEUE) private queue: Queue) {}
  async add(data: CardProps[]): Promise<void> {
    await this.queue.add(FILE_QUEUE_CONSUMER, data)
    console.log('added to queue')
  }
}

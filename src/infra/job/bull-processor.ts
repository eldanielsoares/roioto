import { CardJob } from '@/domain/cards/application/jobs/card-job'
import { CardProps } from '@/domain/cards/enterprise/entities/card'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class BullProcessor implements CardJob {
  constructor(@InjectQueue('process_file_job') private queue: Queue) {}
  async add(data: CardProps[]): Promise<void> {
    await this.queue.add('process_file', data)
    console.log('added to queue')
  }
}

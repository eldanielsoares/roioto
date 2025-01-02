import { Injectable } from '@nestjs/common'
import { Queue } from '../queue/queue'
import { ProcessFile } from '../process-file/process-file'

@Injectable()
export class SaveCardsUsecase {
  constructor(
    private Queue: Queue,
    private processFileRepository: ProcessFile,
  ) {}

  async execute(data: Buffer): Promise<void> {
    const cards = await this.processFileRepository.processFile(data)

    return this.Queue.add(cards)
  }
}

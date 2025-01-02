import { Injectable } from '@nestjs/common'
import { CardQueue } from '../queue/card-queue'
import { ProcessFile } from '../process-file/process-file'

@Injectable()
export class SaveCardsUsecase {
  constructor(
    private CardQueue: CardQueue,
    private processFileRepository: ProcessFile,
  ) {}

  async execute(data: Buffer): Promise<void> {
    const cards = await this.processFileRepository.processFile(data)

    return this.CardQueue.add(cards)
  }
}

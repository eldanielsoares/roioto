import { Injectable } from '@nestjs/common'
import { CardJob } from '../jobs/card-job'
import { ProcessFile } from '../process-file/process-file'

@Injectable()
export class SaveCardsUsecase {
  constructor(
    private cardJob: CardJob,
    private processFileRepository: ProcessFile,
  ) {}

  async execute(data: Buffer): Promise<void> {
    const cards = await this.processFileRepository.processFile(data)

    return this.cardJob.add(cards)
  }
}

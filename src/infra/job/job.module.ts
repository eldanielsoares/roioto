import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { BullConsumer } from './bull-consumer'
import { BullProcessor } from './bull-processor'
import { CardRepository } from '@/domain/cards/application/repositories/card-repository'
import { PrismaCardRepository } from '../database/prisma/repositories/prisma-cards-repository'
import { PrismaService } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/prisma/prisma.module'
import { CardJob } from '@/domain/cards/application/jobs/card-job'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'process_file_job',
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    BullConsumer,
    BullProcessor,
    { provide: CardJob, useClass: BullProcessor },
  ],
  exports: [BullConsumer, BullProcessor, CardJob],
})
export class JobModule {}

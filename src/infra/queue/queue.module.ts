import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { BullCardsConsumer } from './bull-cards-consumer'
import { BullProcessor } from './bull-processor'
import { PrismaService } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/prisma/prisma.module'
import { QueueRepository } from '@/domain/cards/application/queue/queue'
import { CATEGORY_QUEUE, FILE_QUEUE } from './consts/queue'

@Module({
  imports: [
    BullModule.registerQueue({
      name: FILE_QUEUE,
    }),
    BullModule.registerQueue({
      name: CATEGORY_QUEUE,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    BullCardsConsumer,
    BullProcessor,
    { provide: QueueRepository, useClass: BullProcessor },
  ],
  exports: [BullCardsConsumer, BullProcessor, QueueRepository],
})
export class QueueModule {}

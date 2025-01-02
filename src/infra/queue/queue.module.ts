import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { BullConsumer } from './bull-consumer'
import { BullProcessor } from './bull-processor'
import { PrismaService } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/prisma/prisma.module'
import { Queue } from '@/domain/cards/application/queue/queue'
import { FILE_QUEUE } from './consts/queue'

@Module({
  imports: [
    BullModule.registerQueue({
      name: FILE_QUEUE,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    BullConsumer,
    BullProcessor,
    { provide: Queue, useClass: BullProcessor },
  ],
  exports: [BullConsumer, BullProcessor, Queue],
})
export class QueueModule {}

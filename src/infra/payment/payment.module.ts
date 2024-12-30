import { Module } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { Payments } from './payments'
import { Payment } from 'src/domain/user/application/payments/payment'

@Module({
  controllers: [],
  providers: [PrismaService, { provide: Payment, useClass: Payments }],
  exports: [Payment],
})
export class PaymentModule {}

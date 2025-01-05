import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { AuthModule } from './infra/auth/auth.module'
import { EnvModule } from './infra/env/env.module'
import { HttpModule } from './infra/http/http.module'
import { PaymentModule } from './infra/payment/payment.module'
import { BullModule } from '@nestjs/bull'
import { ProcessFileModule } from './infra/process-file/process-file.module'
import { QueueModule } from './infra/queue/queue.module'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    AuthModule,
    HttpModule,
    EnvModule,
    PaymentModule,
    QueueModule,
    ProcessFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

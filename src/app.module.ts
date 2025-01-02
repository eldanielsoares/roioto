import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { AuthModule } from './infra/auth/auth.module'
import { EnvModule } from './infra/env/env.module'
import { HttpModule } from './infra/http/http.module'
import { PaymentModule } from './infra/payment/payment.module'
import { JobModule } from './infra/job/job.module'
import { BullModule } from '@nestjs/bull'
import { ProcessFileModule } from './infra/process-file/process-file.module'

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
    AuthModule,
    HttpModule,
    EnvModule,
    PaymentModule,
    ProcessFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

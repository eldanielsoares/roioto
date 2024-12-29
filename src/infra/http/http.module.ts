import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/prisma.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { EnvModule } from '../env/env.module'
import { CreateUserController } from './controllers/users/CreateUserController'
import { CreateUserUseCase } from 'src/domain/user/application/usecases/create-user'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    CreateUserController,
    // AuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    // UploadAttachmentUseCase,
  ],
})
export class HttpModule {}

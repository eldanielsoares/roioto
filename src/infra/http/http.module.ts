import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/prisma.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { EnvModule } from '../env/env.module'
import { CreateUserController } from './controllers/users/CreateUserController'
import { CreateUserUseCase } from 'src/domain/user/application/usecases/create-user'
import { AuthenticateUserController } from './controllers/users/AuthenticateUserController'
import { AuthenticateUserUseCase } from 'src/domain/user/application/usecases/authenticate-user'
import { FindUserByIdController } from './controllers/users/FindUserById'
import { FindUserByIdUseCase } from 'src/domain/user/application/usecases/find-user-by-id'
import { DeleteUserUseCase } from 'src/domain/user/application/usecases/delete-user'
import { DeleteUserController } from './controllers/users/DeleteUserController'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    FindUserByIdController,
    DeleteUserController,
    // AuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    FindUserByIdUseCase,
    DeleteUserUseCase,
    // UploadAttachmentUseCase,
  ],
})
export class HttpModule {}

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
import { LinkUserCardsToUserUseCase } from 'src/domain/user/application/usecases/link-cards-to-user'
import { LinkUserCardsController } from './controllers/users/LinkUserCardsController'
import { GetUserCardsController } from './controllers/users/GetUserCardsController'
import { GetUserCardsByUserIdAndDeckIdUseCase } from 'src/domain/user/application/usecases/get-user-cards-by-user-id'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    FindUserByIdController,
    DeleteUserController,
    LinkUserCardsController,
    GetUserCardsController,
    // AuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    FindUserByIdUseCase,
    DeleteUserUseCase,
    LinkUserCardsToUserUseCase,
    GetUserCardsByUserIdAndDeckIdUseCase,
    // UploadAttachmentUseCase,
  ],
})
export class HttpModule {}

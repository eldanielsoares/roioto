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
import { CreatePacksController } from './controllers/packs/create-pack-controller'
import { CreatePackUseCase } from 'src/domain/pack/application/usecases/create-pack'
import { FindPackByIdController } from './controllers/packs/find-pack-by-id-controller'
import { FindAllPacksController } from './controllers/packs/find-all-pack-controller'
import { FindAllPacksUseCase } from 'src/domain/pack/application/usecases/find-all-packs'
import { FindByIdPackUseCase } from 'src/domain/pack/application/usecases/find-pack-by-id'
import { DeletePackUseCase } from 'src/domain/pack/application/usecases/delete-pack'
import { DeletePackByIdController } from './controllers/packs/delete-pack-by-id-controller'
import { CreateMatchController } from './controllers/users/create-match-controller'
import { UpdateMatchShotsController } from './controllers/users/update-shot-match-controller'
import { FindMatchByIdController } from './controllers/users/find-match-by-id-controller'
import { FindMatchByUserIdController } from './controllers/users/find-match-by-user-id-controller'
import { CreateMatchUseCase } from 'src/domain/user/application/usecases/create-match'
import { UpdateMatchShotsByIdUseCase } from 'src/domain/user/application/usecases/update-match-shots-by-id'
import { FindMatchByUserIdUseCase } from 'src/domain/user/application/usecases/find-match-by-userId'
import { FindMatchByIdUseCase } from 'src/domain/user/application/usecases/find-match-by-id'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    CreateUserController,
    AuthenticateUserController,
    FindUserByIdController,
    DeleteUserController,
    LinkUserCardsController,
    GetUserCardsController,
    CreatePacksController,
    DeletePackByIdController,
    FindAllPacksController,
    FindPackByIdController,
    CreateMatchController,
    UpdateMatchShotsController,
    FindMatchByIdController,
    FindMatchByUserIdController,
    // AuthenticateController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    FindUserByIdUseCase,
    DeleteUserUseCase,
    LinkUserCardsToUserUseCase,
    GetUserCardsByUserIdAndDeckIdUseCase,
    CreatePackUseCase,
    FindAllPacksUseCase,
    FindByIdPackUseCase,
    DeletePackUseCase,
    CreateMatchUseCase,
    UpdateMatchShotsByIdUseCase,
    FindMatchByUserIdUseCase,
    FindMatchByIdUseCase,
    // UploadAttachmentUseCase,
  ],
})
export class HttpModule {}

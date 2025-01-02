import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/prisma/prisma.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { EnvModule } from '../env/env.module'
import { CreateUserController } from './controllers/users/create-user-controller'
import { CreateUserUseCase } from '@/domain/user/application/usecases/create-user'
import { AuthenticateUserController } from './controllers/users/authenticate-user-controller'
import { AuthenticateUserUseCase } from '@/domain/user/application/usecases/authenticate-user'
import { FindUserByIdController } from './controllers/users/find-user-by-id'
import { FindUserByIdUseCase } from '@/domain/user/application/usecases/find-user-by-id'
import { DeleteUserUseCase } from '@/domain/user/application/usecases/delete-user'
import { DeleteUserController } from './controllers/users/delete-user-controller'
import { LinkUserCardsToUserUseCase } from '@/domain/user/application/usecases/link-cards-to-user'
import { LinkUserCardsController } from './controllers/users/link-user-cards-controller'
import { GetUserCardsController } from './controllers/users/get-user-cards-controller'
import { GetUserCardsByUserIdAndDeckIdUseCase } from '@/domain/user/application/usecases/get-user-cards-by-user-id'
import { CreatePacksController } from './controllers/packs/create-pack-controller'
import { CreatePackUseCase } from '@/domain/pack/application/usecases/create-pack'
import { FindPackByIdController } from './controllers/packs/find-pack-by-id-controller'
import { FindAllPacksController } from './controllers/packs/find-all-pack-controller'
import { FindAllPacksUseCase } from '@/domain/pack/application/usecases/find-all-packs'
import { FindByIdPackUseCase } from '@/domain/pack/application/usecases/find-pack-by-id'
import { DeletePackUseCase } from '@/domain/pack/application/usecases/delete-pack'
import { DeletePackByIdController } from './controllers/packs/delete-pack-by-id-controller'
import { CreateMatchController } from './controllers/users/create-match-controller'
import { UpdateMatchShotsController } from './controllers/users/update-shot-match-controller'
import { FindMatchByIdController } from './controllers/users/find-match-by-id-controller'
import { FindMatchByUserIdController } from './controllers/users/find-match-by-user-id-controller'
import { CreateMatchUseCase } from '@/domain/user/application/usecases/create-match'
import { UpdateMatchShotsByIdUseCase } from '@/domain/user/application/usecases/update-match-shots-by-id'
import { FindMatchByUserIdUseCase } from '@/domain/user/application/usecases/find-match-by-userId'
import { FindMatchByIdUseCase } from '@/domain/user/application/usecases/find-match-by-id'
import { GeneratePreferenceIdUseCase } from '@/domain/user/application/usecases/generate-preference-id'
import { ProcessPaymentUseCase } from '@/domain/user/application/usecases/process-payment'
import { PurchaseWebhookPackUseCase } from '@/domain/user/application/usecases/purchase-webhook'
import { GeneratePreferenceIdController } from './controllers/users/generate-preference-id-controller'
import { ProcessPaymentController } from './controllers/users/process-payment-controller'
import { ProcessPaymentWebhookController } from './controllers/users/process-payment-webhook-controller'
import { UpdatePurchaseStatusPackUseCase } from '@/domain/user/application/usecases/update-purchase-status-pack'
import { UpdateStatusPurchaseController } from './controllers/users/update-purchase-status-controller'
import { AuthenticateUserGoogleController } from './controllers/users/authenticate-user-google'
import { AuthenticateUserGoogleUsecase } from '@/domain/user/application/usecases/authenticate-user-google'
import { AuthenticateUserGoogleCallbackController } from './controllers/users/authenticate-user-google-callback'
import { QueueModule } from '../queue/queue.module'
import { ProcessFileModule } from '../process-file/process-file.module'
import { SaveCardsUsecase } from '@/domain/cards/application/usecases/save-cards'
import { UploadCardsController } from './controllers/cards/upload-cards-controller'
import { SaveCategoriesUsecase } from '@/domain/cards/application/usecases/save-categories'
import { UploadCategoriesController } from './controllers/cards/upload-categories-controller'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    EnvModule,
    QueueModule,
    ProcessFileModule,
  ],
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
    GeneratePreferenceIdController,
    ProcessPaymentController,
    ProcessPaymentWebhookController,
    UpdateStatusPurchaseController,
    AuthenticateUserGoogleController,
    AuthenticateUserGoogleCallbackController,
    UploadCardsController,
    UploadCategoriesController,
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
    GeneratePreferenceIdUseCase,
    ProcessPaymentUseCase,
    PurchaseWebhookPackUseCase,
    UpdatePurchaseStatusPackUseCase,
    AuthenticateUserGoogleUsecase,
    SaveCardsUsecase,
    SaveCategoriesUsecase,
  ],
})
export class HttpModule {}

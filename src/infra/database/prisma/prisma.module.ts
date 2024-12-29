import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { EnvService } from 'src/infra/env/env.service'
import { UsersRepository } from 'src/domain/user/application/repositories/users-repository'
import { HashGenerator } from 'src/domain/user/application/cryptography/hash-generator'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { BcryptHash } from 'src/infra/cryptography/bcrypt-hash'
import { UserCardsRepository } from 'src/domain/user/application/repositories/user-card-repository'
import { PrismaUserCardsRepository } from './repositories/prisma-user-cards-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    // SeedService,
    EnvService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: UserCardsRepository, useClass: PrismaUserCardsRepository },
    // { provide: CreatorsRepository, useClass: PrismaCreatorsRepository },
    // {
    //   provide: TrafficManagersRepository,
    //   useClass: PrismaTrafficManagersRepository,
    // },
    // {
    //   provide: AccountsManagerRepository,
    //   useClass: PrismaAccountsManagerRepository,
    // },
    // {
    //   provide: CategoriesAudiencesRepository,
    //   useClass: PrismaCategoriesAudiencesRepository,
    // },
    // { provide: AttachmentsRepository, useClass: PrismaAttachmentsRepository },
    { provide: HashGenerator, useClass: BcryptHash },
    // { provide: VideoRepository, useClass: PrismaVideoRepository },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    HashGenerator,
    EnvService,
    UserCardsRepository,
  ],
})
export class DatabaseModule {}

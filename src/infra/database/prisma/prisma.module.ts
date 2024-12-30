import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { EnvService } from 'src/infra/env/env.service'
import { UsersRepository } from 'src/domain/user/application/repositories/users-repository'
import { HashGenerator } from 'src/domain/user/application/cryptography/hash-generator'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { BcryptHash } from 'src/infra/cryptography/bcrypt-hash'
import { UserCardsRepository } from 'src/domain/user/application/repositories/user-card-repository'
import { PrismaUserCardsRepository } from './repositories/prisma-user-cards-repository'
import { PackRepository } from 'src/domain/pack/application/repositories/pack-repository'
import { PrismaPackRepository } from './repositories/prisma-pack-repository'
import { MatchRepository } from 'src/domain/user/application/repositories/match.repository'
import { PrismaMatchesRepository } from './repositories/prisma-matches-repository'
import { PurchaseCardsRepository } from 'src/domain/user/application/repositories/purchase-cards-repository'
import { PrismaPurchaseCardsRepository } from './repositories/prisma-purchase-cards'
import { Payment } from 'src/domain/user/application/payments/payment'
import { Payments } from 'src/infra/payment/payments'

@Module({
  imports: [],
  providers: [
    PrismaService,
    EnvService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: UserCardsRepository, useClass: PrismaUserCardsRepository },
    { provide: PackRepository, useClass: PrismaPackRepository },
    { provide: MatchRepository, useClass: PrismaMatchesRepository },
    { provide: HashGenerator, useClass: BcryptHash },
    {
      provide: PurchaseCardsRepository,
      useClass: PrismaPurchaseCardsRepository,
    },
    {
      provide: Payment,
      useClass: Payments,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    HashGenerator,
    EnvService,
    UserCardsRepository,
    PackRepository,
    MatchRepository,
    PurchaseCardsRepository,
    Payment,
  ],
})
export class DatabaseModule {}

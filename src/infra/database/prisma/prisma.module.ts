import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { EnvService } from '@/infra/env/env.service'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { HashGenerator } from '@/domain/user/application/cryptography/hash-generator'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { BcryptHash } from '@/infra/cryptography/bcrypt-hash'
import { UserCardsRepository } from '@/domain/user/application/repositories/user-card-repository'
import { PrismaUserCardsRepository } from './repositories/prisma-user-cards-repository'
import { PackRepository } from '@/domain/pack/application/repositories/pack-repository'
import { PrismaPackRepository } from './repositories/prisma-pack-repository'
import { MatchRepository } from '@/domain/user/application/repositories/match.repository'
import { PrismaMatchesRepository } from './repositories/prisma-matches-repository'
import { PurchaseCardsRepository } from '@/domain/user/application/repositories/purchase-cards-repository'
import { PrismaPurchaseCardsRepository } from './repositories/prisma-purchase-cards'
import { Payment } from '@/domain/user/application/payments/payment'
import { Payments } from '@/infra/payment/payments'
import { CardRepository } from '@/domain/cards/application/repositories/card-repository'
import { PrismaCardRepository } from './repositories/prisma-cards-repository'
import { CategoryRepository } from '@/domain/cards/application/repositories/category-repository'
import { PrismaCategoryRepository } from './repositories/prisma-category-repository'
import { DeckRepository } from '@/domain/cards/application/repositories/deck-repository'
import { PrismaDeckRepository } from './repositories/prisma-deck-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    // SeedService,
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
    {
      provide: CardRepository,
      useClass: PrismaCardRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: DeckRepository,
      useClass: PrismaDeckRepository,
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
    CardRepository,
    CategoryRepository,
    DeckRepository,
  ],
})
export class DatabaseModule {}

import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { HashGenerator } from '@/domain/user/application/cryptography/hash-generator'
import { EnvService } from '@/infra/env/env.service'
import { ulid } from 'ulid'

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly envService: EnvService,
  ) {}

  async onModuleInit() {
    if (this.envService.get('NODE_ENV') !== 'development') {
      return
    }

    await this.seed()
    console.log('Seeding completed')
  }

  async seed() {
    await this.seedcategories()
    await this.seedDecks()
  }

  private async seedcategories() {
    const categories = [
      { name: 'punishment', id: ulid() },
      { name: 'challenge', id: ulid() },
      { name: 'vote', id: ulid() },
      { name: 'action', id: ulid() },
      { name: 'truthOrDare', id: ulid() },
      { name: 'personal', id: ulid() },
      { name: 'truth', id: ulid() },
      { name: 'lie', id: ulid() },
      { name: 'discord', id: ulid() },
      { name: 'gossip', id: ulid() },
      { name: 'opinion', id: ulid() },
    ]

    await this.prisma.category.createMany({
      data: categories,
    })

    console.log('categories created:')
  }

  private async seedDecks() {
    const decks = [
      { name: 'love', id: ulid() },
      { name: 'fallen', id: ulid() },
    ]
    await this.prisma.deck.createMany({
      data: decks,
    })

    console.log('decks created:')
  }
}

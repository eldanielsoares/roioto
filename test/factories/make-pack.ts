import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PurchaseCardsProps } from '@/domain/user/enterprise/entities/purchase-cards'
import { Pack, PackProps } from '@/domain/pack/enterprise/entities/pack'
import { PrismaPackMapper } from '@/infra/database/prisma/mappers/prisma-pack-mapper'

export function makePack(
  override: Partial<PackProps> = {},
  id?: UniqueEntityID,
) {
  const user = Pack.create(
    {
      name: faker.food.fruit(),
      price: 5,
      quantity: 5,
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class PackFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPack(data: Partial<PurchaseCardsProps> = {}): Promise<Pack> {
    const pack = makePack(data)

    await this.prisma.pack.create({
      data: PrismaPackMapper.toPrisma(pack),
    })

    return pack
  }
}

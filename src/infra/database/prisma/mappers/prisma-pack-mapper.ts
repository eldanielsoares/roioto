import { Prisma, Pack as PrismaPack } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pack } from '@/domain/pack/enterprise/entities/pack'

export class PrismaPackMapper {
  static toDomain(raw: PrismaPack): Pack {
    return Pack.create(
      {
        name: raw.name,
        quantity: raw.quantity,
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: Pack): Prisma.PackUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      quantity: user.quantity,
      price: user.price,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

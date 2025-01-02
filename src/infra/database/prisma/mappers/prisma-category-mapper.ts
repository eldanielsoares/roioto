import { Prisma, Category as PrismaCategory } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/cards/enterprise/entities/category'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}

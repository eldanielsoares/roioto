import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CategoryRepository } from '@/domain/cards/application/repositories/category-repository'
import { Category } from '@/domain/cards/enterprise/entities/category'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveBatch(categories: Category[]): Promise<void> {
    const categoryData = categories.map((category) =>
      PrismaCategoryMapper.toPrisma(category),
    )

    await this.prisma.category.createMany({
      data: categoryData,
    })
  }
}

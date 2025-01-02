import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { CATEGORY_QUEUE, CATEGORY_QUEUE_CONSUMER } from './consts/queue'
import { CategoryRepository } from '@/domain/cards/application/repositories/category-repository'
import {
  Category,
  CategoryProps,
} from '@/domain/cards/enterprise/entities/category'

@Processor(CATEGORY_QUEUE)
export class BullCategoriesConsumer {
  constructor(private readonly categoriesRepository: CategoryRepository) {}

  @Process(CATEGORY_QUEUE_CONSUMER)
  async handle(job: Job<CategoryProps[]>) {
    const categories = job.data.map((data) =>
      Category.create(
        {
          name: data.name,
          updatedAt: new Date(),
        },
        new UniqueEntityID(),
      ),
    )

    console.log(`Processing ${categories.length} categories...`)
    await this.categoriesRepository.saveBatch(categories)
    console.log(`Processed ${categories.length} categories.`)
  }
}

import { Category } from '../../enterprise/entities/category'

export abstract class CategoryRepository {
  abstract saveBatch(data: Category[]): Promise<void>
}

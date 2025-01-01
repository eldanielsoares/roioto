import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PackRepository } from '@/domain/pack/application/repositories/pack-repository'
import { Pack } from '@/domain/pack/enterprise/entities/pack'

export class InMemoryPackRepository implements PackRepository {
  public items: Pack[] = []

  create(data: Pack): Promise<Pack> {
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<Pack[]> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Pack> {
    return this.items.find((pack) => pack.id.toString() === id)
  }
  update(id: string, data: Pack): Promise<Pack> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

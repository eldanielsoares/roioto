import { Pack } from '../../enterprise/entities/pack'

export abstract class PackRepository {
  abstract create(data: Pack): Promise<Pack>
  abstract findAll(): Promise<Pack[]>
  abstract findById(id: string): Promise<Pack | undefined>
  abstract update(id: string, data: Pack): Promise<Pack>
  abstract delete(id: string): Promise<void>
}

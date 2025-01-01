import { Injectable } from '@nestjs/common'
import { PackRepository } from '../repositories/pack-repository'
import { Pack } from '../../enterprise/entities/pack'
import { Either, left, right } from '@/core/either'
import { PackNotFoundError } from './errors/pack-not-found-error'

type PackResponse = Either<PackNotFoundError, { pack: Pack }>

@Injectable()
export class FindByIdPackUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(id: string): Promise<PackResponse> {
    const pack = await this.packRepository.findById(id)

    if (!pack) return left(new PackNotFoundError())

    return right({
      pack,
    })
  }
}

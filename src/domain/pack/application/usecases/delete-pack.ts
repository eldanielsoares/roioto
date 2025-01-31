import { Injectable } from '@nestjs/common'
import { PackRepository } from '../repositories/pack-repository'
import { Either, left, right } from '@/core/either'
import { PackNotFoundError } from './errors/pack-not-found-error'

type PackResponse = Either<PackNotFoundError, void>

@Injectable()
export class DeletePackUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(id: string): Promise<PackResponse> {
    const findPack = await this.packRepository.findById(id)

    if (!findPack) return left(new PackNotFoundError())

    const savedPack = await this.packRepository.delete(id)

    return right(undefined)
  }
}

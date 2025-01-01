import { Injectable } from '@nestjs/common'
import { PackRepository } from '../repositories/pack-repository'
import { Pack } from '../../enterprise/entities/pack'
import { Either, left, right } from '@/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

type PackResponse = Either<SomethingGoesWrongError, { packs: Pack[] }>

@Injectable()
export class FindAllPacksUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(): Promise<PackResponse> {
    const packs = await this.packRepository.findAll()

    if (!packs) return left(new SomethingGoesWrongError())

    return right({
      packs,
    })
  }
}

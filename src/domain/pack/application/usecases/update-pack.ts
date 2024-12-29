import { Injectable } from '@nestjs/common'
import { PackRepository } from '../repositories/pack-repository'
import { Pack } from '../../enterprise/entities/pack'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { PackNotFoundError } from './errors/pack-not-found-error'

type PackRequest = {
  name: string
  price: number
  quantity: number
}

type PackResponse = Either<PackNotFoundError, { pack: Pack }>

@Injectable()
export class UpdatePackUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(id: string, data: PackRequest): Promise<PackResponse> {
    const findPack = await this.packRepository.findById(id)

    if (!findPack) return left(new PackNotFoundError())

    const pack = Pack.create(data)

    const savedPack = await this.packRepository.update(id, pack)

    return right({
      pack: savedPack,
    })
  }
}

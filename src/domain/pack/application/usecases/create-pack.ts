import { Injectable } from '@nestjs/common'
import { PackRepository } from '../repositories/pack-repository'
import { Pack } from '../../enterprise/entities/pack'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

type PackRequest = {
  name: string
  price: number
  quantity: number
}

type PackResponse = Either<SomethingGoesWrongError, { pack: Pack }>

@Injectable()
export class CreatePackUseCase {
  constructor(private packRepository: PackRepository) {}

  async execute(data: PackRequest): Promise<PackResponse> {
    const pack = Pack.create(data)

    const savedPack = await this.packRepository.create(pack)

    if (!savedPack) return left(new SomethingGoesWrongError())

    return right({
      pack: savedPack,
    })
  }
}

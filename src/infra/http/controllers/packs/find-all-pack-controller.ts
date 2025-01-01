import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { PackPresenter } from '../../presenters/pack-presenter'
import { FindAllPacksUseCase } from '@/domain/pack/application/usecases/find-all-packs'
import { PackNotFoundError } from '@/domain/pack/application/usecases/errors/pack-not-found-error'

@Controller('/packs/all')
@Public()
export class FindAllPacksController {
  constructor(private findAllPack: FindAllPacksUseCase) {}

  @Get()
  async handle() {
    const result = await this.findAllPack.execute()

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PackNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      pack: result.value.packs.map((pack) => PackPresenter.toHTTP(pack)),
    }
  }
}

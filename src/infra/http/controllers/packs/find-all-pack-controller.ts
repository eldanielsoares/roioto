import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { CreatePackUseCase } from 'src/domain/pack/application/usecases/create-pack'
import { SomethingGoesWrongError } from 'src/domain/user/application/usecases/errors/something-goes-wrong'
import { PackPresenter } from '../../presenters/pack-presenter'
import { FindAllPacksUseCase } from 'src/domain/pack/application/usecases/find-all-packs'
import { PackNotFoundError } from 'src/domain/pack/application/usecases/errors/pack-not-found-error'

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

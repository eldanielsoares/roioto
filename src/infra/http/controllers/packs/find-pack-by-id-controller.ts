import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { Public } from 'src/infra/auth/public'
import { PackPresenter } from '../../presenters/pack-presenter'
import { FindByIdPackUseCase } from 'src/domain/pack/application/usecases/find-pack-by-id'
import { PackNotFoundError } from 'src/domain/pack/application/usecases/errors/pack-not-found-error'

@Controller('/packs')
@Public()
export class FindPackByIdController {
  constructor(private findPackById: FindByIdPackUseCase) {}

  @Get(':id')
  async handle(
    @Param('id')
    id: string,
  ) {
    const result = await this.findPackById.execute(id)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PackNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { pack: PackPresenter.toHTTP(result.value.pack) }
  }
}

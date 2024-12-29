import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { CreatePackUseCase } from 'src/domain/pack/application/usecases/create-pack'
import { SomethingGoesWrongError } from 'src/domain/user/application/usecases/errors/something-goes-wrong'
import { PackPresenter } from '../../presenters/pack-presenter'
import { FindByIdPackUseCase } from 'src/domain/pack/application/usecases/find-pack-by-id'
import { PackNotFoundError } from 'src/domain/pack/application/usecases/errors/pack-not-found-error'
import { DeletePackUseCase } from 'src/domain/pack/application/usecases/delete-pack'

@Controller('/packs')
@Public()
export class DeletePackByIdController {
  constructor(private deletePackById: DeletePackUseCase) {}

  @Delete(':id')
  async handle(
    @Param('id')
    id: string,
  ) {
    const result = await this.deletePackById.execute(id)
    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case PackNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    return { message: 'pack successfully deleted' }
  }
}

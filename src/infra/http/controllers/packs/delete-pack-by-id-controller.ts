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
import { Public } from '@/infra/auth/public'
import { PackNotFoundError } from '@/domain/pack/application/usecases/errors/pack-not-found-error'
import { DeletePackUseCase } from '@/domain/pack/application/usecases/delete-pack'

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

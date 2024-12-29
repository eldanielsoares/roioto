import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { CreatePackUseCase } from 'src/domain/pack/application/usecases/create-pack'
import { SomethingGoesWrongError } from 'src/domain/user/application/usecases/errors/something-goes-wrong'
import { PackPresenter } from '../../presenters/pack-presenter'

const createpackBodySchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
})

type CreatePackBodySchema = z.infer<typeof createpackBodySchema>

@Controller('/packs')
export class CreatePacksController {
  constructor(private createPack: CreatePackUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createpackBodySchema))
    body: CreatePackBodySchema,
  ) {
    const { name, quantity, price } = createpackBodySchema.parse(body)

    const result = await this.createPack.execute({ name, quantity, price })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SomethingGoesWrongError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { pack: PackPresenter.toHTTP(result.value.pack) }
  }
}

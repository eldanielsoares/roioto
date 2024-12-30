import {
  BadRequestException,
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { CreateUserUseCase } from 'src/domain/user/application/usecases/create-user'
import { GeneratePreferenceIdUseCase } from 'src/domain/user/application/usecases/generate-preference-id'

const generatePreferenceIdBodySchema = z.object({
  packId: z.string(),
})

type GeneratePreferenceBodySchema = z.infer<
  typeof generatePreferenceIdBodySchema
>

const GeneratePreferenceBodySchema = new ZodValidationPipe(
  generatePreferenceIdBodySchema,
)

@Controller('/users/generatePreference')
@Public()
export class GeneratePreferenceIdController {
  constructor(private generatePreferenceId: GeneratePreferenceIdUseCase) {}

  @Post()
  @UsePipes()
  async handle(
    @Body(GeneratePreferenceBodySchema) body: GeneratePreferenceBodySchema,
  ) {
    const { packId } = generatePreferenceIdBodySchema.parse(body)

    const result = await this.generatePreferenceId.execute(packId)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { preferenceId: result.value.preferenceId }
  }
}

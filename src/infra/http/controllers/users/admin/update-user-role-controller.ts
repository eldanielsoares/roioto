import { UserNotFoundError } from '@/domain/user/application/usecases/errors/user-not-found-error'
import { UpdateUserRoleUseCase } from '@/domain/user/application/usecases/update-user-role'
import { AdminGuard } from '@/infra/auth/admin.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

const updateUserRoleBodySchema = z.object({
  userId: z.string(),
  role: z.string(),
})

type UpdateUserRoleBodySchema = z.infer<typeof updateUserRoleBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserRoleBodySchema)

@Controller('/admin/user')
export class UpdateUserRoleController {
  constructor(private updateUserRoleUseCase: UpdateUserRoleUseCase) {}

  @UseGuards(AdminGuard)
  @Put()
  async handle(@Body(bodyValidationPipe) body: UpdateUserRoleBodySchema) {
    const { userId, role } = body

    const result = await this.updateUserRoleUseCase.execute(userId, role)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { message: 'role successfully updated' }
  }
}

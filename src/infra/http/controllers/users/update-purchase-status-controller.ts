import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { UserAlreadyExistsError } from '@/domain/user/application/usecases/errors/user-already-exists-error'
import { UpdatePurchaseStatusPackUseCase } from '@/domain/user/application/usecases/update-purchase-status-pack'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PurchaseCardsPresenter } from '../../presenters/purchase-cards-presenter'
import { SomethingGoesWrongError } from '@/domain/user/application/usecases/errors/something-goes-wrong'

const updatePurchaseStatusBodySchema = z.object({
  status: z.string(),
})

type UpdatePurchaseBodySchema = z.infer<typeof updatePurchaseStatusBodySchema>

const UpdatePuchaseBodySchema = new ZodValidationPipe(
  updatePurchaseStatusBodySchema,
)

@Controller('/users/generatePreference')
@Public()
export class UpdateStatusPurchaseController {
  constructor(private updatePurchaseStatus: UpdatePurchaseStatusPackUseCase) {}

  @Post(':id')
  @UsePipes()
  async handle(
    @Body(UpdatePuchaseBodySchema) body: UpdatePurchaseBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
  ) {
    const { status } = updatePurchaseStatusBodySchema.parse(body)
    const {
      sub: { userId },
    } = user

    const result = await this.updatePurchaseStatus.execute({
      id,
      status,
      userId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SomethingGoesWrongError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return PurchaseCardsPresenter.toHTTP(result.value.purchaseCard)
  }
}

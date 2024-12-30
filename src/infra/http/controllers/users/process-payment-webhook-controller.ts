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
import { ProcessPaymentUseCase } from 'src/domain/user/application/usecases/process-payment'
import { PurchaseWebhookPackUseCase } from 'src/domain/user/application/usecases/purchase-webhook'

const processPaymentBodySchema = z.object({
  paymentId: z.string(),
  status: z.string(),
})

type ProcessPaymenteWebHookBodySchema = z.infer<typeof processPaymentBodySchema>

const ProcessPaymentWebhookBodySchema = new ZodValidationPipe(
  processPaymentBodySchema,
)

@Controller('/users/processPayment/webhook')
@Public()
export class ProcessPaymentWebhookController {
  constructor(private processPaymentWebhook: PurchaseWebhookPackUseCase) {}

  @Post()
  @UsePipes()
  async handle(
    @Body(ProcessPaymentWebhookBodySchema)
    body: ProcessPaymenteWebHookBodySchema,
  ) {
    const data = processPaymentBodySchema.parse(body)

    const result = await this.processPaymentWebhook.execute({
      paymentId: data.paymentId,
      status: data.status,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}

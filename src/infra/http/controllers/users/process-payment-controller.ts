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
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'

const processPaymentBodySchema = z.object({
  packId: z.string(),
  deckId: z.string(),
  transaction_amount: z.number(),
  description: z.string(),
  payment_method_id: z.string(),
  payer: z.any(),
  token: z.string(),
  issuer_id: z.number(),
  installments: z.number().optional(),
})

type ProcessPaymenteBodySchema = z.infer<typeof processPaymentBodySchema>

const ProcessPaymentBodySchema = new ZodValidationPipe(processPaymentBodySchema)

@Controller('/users/processPayment')
@Public()
export class ProcessPaymentController {
  constructor(private processPayment: ProcessPaymentUseCase) {}

  @Post()
  @UsePipes()
  async handle(
    @Body(ProcessPaymentBodySchema) body: ProcessPaymenteBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const data = processPaymentBodySchema.parse(body)

    const {
      sub: { userId },
    } = user

    const result = await this.processPayment.execute({
      userId,
      packId: data.packId,
      deckId: data.deckId,
      transaction_amount: data.transaction_amount,
      description: data.description,
      payment_method_id: data.payment_method_id,
      payer: data.payer,
      token: data.token,
      issuer_id: data.issuer_id,
      installments: data.installments,
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

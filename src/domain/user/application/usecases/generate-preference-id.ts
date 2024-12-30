import { Injectable } from '@nestjs/common'
import { Payment, PaymentPreferences } from '../payments/payment'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { Either, left, right } from 'src/core/either'
import { PackRepository } from 'src/domain/pack/application/repositories/pack-repository'

type PreferenceIdByIdResponse = Either<
  SomethingGoesWrongError,
  {
    preferenceId: string
  }
>

@Injectable()
export class GeneratePreferenceIdUseCase {
  constructor(
    private payment: Payment,
    private pack: PackRepository,
  ) {}

  async execute(packId: string): Promise<PreferenceIdByIdResponse> {
    const pack = await this.pack.findById(packId)

    const preferenceId = await this.payment.createPreference({
      id: pack.id.toString(),
      description: pack.name,
      title: pack.name,
      unit_price: pack.price,
    })

    if (!preferenceId) return left(new SomethingGoesWrongError())

    return right({
      preferenceId,
    })
  }
}

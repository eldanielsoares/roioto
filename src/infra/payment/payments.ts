import { Injectable } from '@nestjs/common'
import {
  Payment,
  PaymentPreferences,
  ProcessPayment,
} from 'src/domain/user/application/payments/payment'

import MercadoPagoConfig, {
  Preference,
  Payment as MPPayment,
} from 'mercadopago'

import { ulid } from 'ulid'

@Injectable()
export class Payments implements Payment {
  private readonly payment: MPPayment
  private readonly preference: Preference

  constructor() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      options: {
        timeout: 5000,
      },
    })

    const payment = new MPPayment(client)
    const preference = new Preference(client)

    this.payment = payment
    this.preference = preference
  }

  async createPreference(data: PaymentPreferences): Promise<string> {
    const { id, description, title, unit_price } = data
    const preferenceResponse = await this.preference.create({
      body: {
        items: [
          {
            id,
            description,
            quantity: 1,
            title,
            currency_id: 'BRL',
            unit_price,
          },
        ],
      },
    })

    return preferenceResponse.id
  }
  async processPayment(data: ProcessPayment): Promise<unknown> {
    try {
      const payment = await this.payment.create({
        body: {
          transaction_amount: data.transaction_amount,
          description: data.description,
          payment_method_id: data.payment_method_id,
          payer: data.payer,
          installments: data.installments,
          token: data.token,
          issuer_id: data.issuer_id,
        },
        requestOptions: { idempotencyKey: ulid() },
      })

      return payment
    } catch {
      console.log('error')
    }
  }
}

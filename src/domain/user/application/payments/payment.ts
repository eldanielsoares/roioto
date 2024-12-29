export type PaymentPreferences = {
  id: string
  description: string
  title: string
  unit_price: number
}

export type ProcessPayment = {
  transaction_amount: number
  description: string
  payment_method_id: string
  payer: unknown
  installments: number
  token: string
  issuer_id: number
}

export abstract class Payment {
  abstract createPreference(data: PaymentPreferences): Promise<string>
  abstract processPayment(data: ProcessPayment): Promise<unknown>
}

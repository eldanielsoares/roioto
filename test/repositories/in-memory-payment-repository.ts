import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Payment,
  PaymentPreferences,
  ProcessPayment,
} from '@/domain/user/application/payments/payment'

export class InMemoryPaymentRepository implements Payment {
  async createPreference(data: PaymentPreferences): Promise<string> {
    return JSON.stringify(data)
  }
  async processPayment(data: ProcessPayment): Promise<any> {
    return {
      ...data,
      paymentId: new UniqueEntityID().toString(),
    }
  }
}

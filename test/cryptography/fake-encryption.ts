import { Encryption } from '@/domain/user/application/cryptography/encrypt'

export class FakeEncryption implements Encryption {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

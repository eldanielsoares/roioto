import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'
import { HashComparer } from '@/domain/user/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/user/application/cryptography/hash-generator'

@Injectable()
export class BcryptHash implements HashComparer, HashGenerator {
  private HASH_SALT_LENGTH = 8
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}

import { Module } from '@nestjs/common'

import { JwtEncryption } from './jwt-encryption'
import { BcryptHash } from './bcrypt-hash'
import { Encryption } from '@/domain/user/application/cryptography/encrypt'
import { HashComparer } from '@/domain/user/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/user/application/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encryption, useClass: JwtEncryption },
    { provide: HashComparer, useClass: BcryptHash },
    { provide: HashGenerator, useClass: BcryptHash },
  ],
  exports: [Encryption, HashComparer, HashGenerator],
})
export class CryptographyModule {}

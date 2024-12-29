import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Encryption } from 'src/domain/user/application/cryptography/encrypt'

@Injectable()
export class JwtEncryption implements Encryption {
  constructor(private jwtService: JwtService) {}
  encrypt(
    payload: Record<string, unknown>,
    options: Record<string, unknown>,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, options)
  }
}

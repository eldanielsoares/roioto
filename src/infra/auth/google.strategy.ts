import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { EnvService } from '../env/env.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(env: EnvService) {
    const clientSecret = env.get('GOOGLE_CLIENT_SECRET')
    const clientID = env.get('GOOGLE_CLIENT_ID')
    const callbackURL = env.get('GOOGLE_CALLBACK_URL')
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, name } = profile
    const user = {
      id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
    }
    done(null, user)
  }
}

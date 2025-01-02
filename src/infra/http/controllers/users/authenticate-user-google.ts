import { Public } from '@/infra/auth/public'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth/google')
export class AuthenticateUserGoogleController {
  constructor() {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get()
  async handle() {}
}

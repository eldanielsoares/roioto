import { AuthenticateUserGoogleUsecase } from '@/domain/user/application/usecases/authenticate-user-google'
import { SomethingGoesWrongError } from '@/domain/user/application/usecases/errors/something-goes-wrong'
import { User } from '@/domain/user/enterprise/entities/user'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth/google/callback')
export class AuthenticateUserGoogleCallbackController {
  constructor(
    private readonly authenticateGoogleUseCase: AuthenticateUserGoogleUsecase,
  ) {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get()
  async googleLoginCallback(@Req() req, @Res() res) {
    const user = User.create({
      name: req.user.name,
      email: req.user.email,
      password: '',
      provider: 'google',
    })
    const result = await this.authenticateGoogleUseCase.execute(user)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SomethingGoesWrongError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    res.redirect(`http://localhost:3000/${result.value.accessToken}`)
  }
}

import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { AuthenticateUserUseCase } from '@/domain/user/application/usecases/authenticate-user'
import { WrongCredentialsError } from '@/domain/user/application/usecases/errors/wrong-credentials-error'

const authUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthUserBodySchema = z.infer<typeof authUserBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateUserController {
  constructor(private authUser: AuthenticateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authUserBodySchema))
  async handle(@Body() body: AuthUserBodySchema) {
    const { email, password } = authUserBodySchema.parse(body)

    const result = await this.authUser.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { accessToken: result.value.accessToken }
  }
}

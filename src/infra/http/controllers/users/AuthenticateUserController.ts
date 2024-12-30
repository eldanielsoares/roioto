import {
  BadRequestException,
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { CreateUserUseCase } from 'src/domain/user/application/usecases/create-user'
import { AuthenticateUserUseCase } from 'src/domain/user/application/usecases/authenticate-user'
import { WrongCredentialsError } from 'src/domain/user/application/usecases/errors/wrong-credentials-error'

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
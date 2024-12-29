import {
  BadRequestException,
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Post,
  UsePipes,
  Get,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { Public } from 'src/infra/auth/public'
import { UserAlreadyExistsError } from 'src/domain/user/application/usecases/errors/user-already-exists-error'
import { CreateUserUseCase } from 'src/domain/user/application/usecases/create-user'
import { CreateMatchUseCase } from 'src/domain/user/application/usecases/create-match'
import { MatchPresenter } from '../../presenters/match-presenter'
import { FindMatchByIdUseCase } from 'src/domain/user/application/usecases/find-match-by-id'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { FindMatchByUserIdUseCase } from 'src/domain/user/application/usecases/find-match-by-userId'

@Controller('/users/matches')
export class FindMatchByUserIdController {
  constructor(private findMatchByUserId: FindMatchByUserIdUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const {
      sub: { userId },
    } = user
    const result = await this.findMatchByUserId.execute(userId)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      matches: result.value.matchs.map((match) => MatchPresenter.toHTTP(match)),
    }
  }
}

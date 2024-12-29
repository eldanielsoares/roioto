import { Injectable } from '@nestjs/common'
import { UserCardsRepository } from '../repositories/user-card-repository'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'
import { UserCard } from '../../enterprise/entities/user-card'

export type LinkCardsToUserRequest = {
  userId: string
  deckId: string
  quantity?: number
}

export type LinkCardsToUserResponse = Either<
  SomethingGoesWrongError,
  { userCards: UserCard[] }
>

@Injectable()
export class LinkUserCardsToUserUseCase {
  constructor(private readonly userCardsRepository: UserCardsRepository) {}

  async execute({
    userId,
    deckId,
    quantity = 10,
  }: LinkCardsToUserRequest): Promise<LinkCardsToUserResponse> {
    const userCards = await this.userCardsRepository.linkUserCardsToUser({
      userId,
      deckId,
      quantity,
    })

    if (!userCards) return left(new SomethingGoesWrongError())

    return right({
      userCards,
    })
  }
}

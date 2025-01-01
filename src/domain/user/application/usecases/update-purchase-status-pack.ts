import { Injectable } from '@nestjs/common'
import { PurchaseCardsRepository } from '../repositories/purchase-cards-repository'
import { PurchaseCards } from '../../enterprise/entities/purchase-cards'
import { Either, left, right } from 'src/core/either'
import { SomethingGoesWrongError } from './errors/something-goes-wrong'

type UpdatePurchasePackStatus = {
  id: string
  userId: string
  status: string
}

type UpdatePurchaseResponse = Either<
  SomethingGoesWrongError,
  {
    purchaseCard: PurchaseCards
  }
>

@Injectable()
export class UpdatePurchaseStatusPackUseCase {
  constructor(private readonly purchaseRepository: PurchaseCardsRepository) {}

  async execute({
    userId,
    id,
    status,
  }: UpdatePurchasePackStatus): Promise<UpdatePurchaseResponse> {
    const purchaseCard = PurchaseCards.create({
      userId,
      status,
      updatedAt: new Date(),
    })

    const savedPurchaseCard = await this.purchaseRepository.updatePurchaseCards(
      id,
      purchaseCard,
    )

    if (!savedPurchaseCard) return left(new SomethingGoesWrongError())

    return right({
      purchaseCard: savedPurchaseCard,
    })
  }
}

import { UserCard } from 'src/domain/user/enterprise/entities/user-card'

export class UserCardPresenter {
  static toHTTP(userCard: UserCard) {
    return {
      id: userCard.id.toString(),
      userId: userCard.userId.toString(),
      deckId: userCard.deckId.toString(),
      cardId: userCard.cardId.toString(),
      createdAt: userCard.createdAt,
      updatedAt: userCard.updatedAt,
      card: {
        id: userCard?.card?.id.toString(),
        categoryId: userCard?.card?.categoryId.toString(),
        description: userCard?.card?.description,
        image: userCard?.card?.image,
        weight: userCard?.card?.weight,
        shots: userCard?.card?.shots,
        isFree: userCard?.card?.isFree,
        level: userCard?.card?.level,
        deckId: userCard?.card?.deckId.toString(),
        createdAt: userCard?.card?.createdAt,
        updatedAt: userCard?.card?.updatedAt,
        packId: userCard?.card?.packId?.toString(),
      },
    }
  }
}

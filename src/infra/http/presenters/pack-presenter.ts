import { Pack } from 'src/domain/pack/enterprise/entities/pack'

export class PackPresenter {
  static toHTTP(pack: Pack) {
    return {
      name: pack.name,
      quantity: pack.quantity,
      price: pack.price,
      createdAt: pack.createdAt,
      updatedAt: pack.updatedAt,
    }
  }
}

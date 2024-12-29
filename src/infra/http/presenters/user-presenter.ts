import { User } from 'src/domain/user/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      name: user.name,
      email: user.email,
      level: user.level,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

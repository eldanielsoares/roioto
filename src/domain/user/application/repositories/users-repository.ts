import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>
  abstract findById(id: string): Promise<User | undefined>
  abstract update(id: string, user: User): Promise<User>
  abstract delete(id: string): Promise<void>
  abstract findByEmail(email: string): Promise<User | undefined>
}

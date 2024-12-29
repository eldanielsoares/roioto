import { Prisma, User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { User } from 'src/domain/user/enterprise/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        level: raw.level,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      level: user.level,
      createdAt: user.createdAt,
    }
  }
}

import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { User } from '@/domain/user/enterprise/entities/user'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)

    const savedUser = await this.prisma.user.create({ data })

    return PrismaUserMapper.toDomain(savedUser)
  }
  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }
  async update(id: string, user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)

    const userUpdated = await this.prisma.user.update({ where: { id }, data })

    return PrismaUserMapper.toDomain(userUpdated)
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async updateUserRole(id: string, role: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { role } })
  }
}

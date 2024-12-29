import { PackRepository } from 'src/domain/pack/application/repositories/pack-repository'
import { Pack } from 'src/domain/pack/enterprise/entities/pack'
import { PrismaService } from '../prisma.service'
import { PrismaPackMapper } from '../mappers/prisma-pack-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPackRepository implements PackRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Pack): Promise<Pack> {
    const pack = PrismaPackMapper.toPrisma(data)

    const createdPack = await this.prisma.pack.create({ data: pack })

    return PrismaPackMapper.toDomain(createdPack)
  }
  async findAll(): Promise<Pack[]> {
    const packs = await this.prisma.pack.findMany()

    if (!packs?.length) return null

    return packs.map(PrismaPackMapper.toDomain)
  }
  async findById(id: string): Promise<Pack> {
    const pack = await this.prisma.pack.findFirst({ where: { id } })
    if (!pack) return null
    return PrismaPackMapper.toDomain(pack)
  }
  async update(id: string, data: Pack): Promise<Pack> {
    const pack = PrismaPackMapper.toPrisma(data)
    const updatedPack = await this.prisma.pack.update({
      where: { id },
      data: pack,
    })
    return PrismaPackMapper.toDomain(updatedPack)
  }
  async delete(id: string): Promise<void> {
    await this.prisma.pack.delete({ where: { id } })
  }
}

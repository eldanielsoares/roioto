import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

export const categories = [
  { name: 'punishment', id: ulid() },
  { name: 'challenge', id: ulid() },
  { name: 'vote', id: ulid() },
  { name: 'action', id: ulid() },
  { name: 'truthOrDare', id: ulid() },
  { name: 'personal', id: ulid() },
  { name: 'truth', id: ulid() },
  { name: 'lie', id: ulid() },
  { name: 'discord', id: ulid() },
  { name: 'gossip', id: ulid() },
  { name: 'opinion', id: ulid() },
]

async function main() {
  // Array para armazenar cartas

  // Inserir no banco de dados
  await prisma.category.createMany({
    data: categories,
  })

  console.log(`Seed complete!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

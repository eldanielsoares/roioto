import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

export const decks = [
  { name: 'love', id: ulid() },
  { name: 'fallen', id: ulid() },
]

async function main() {
  // Array para armazenar cartas

  // Inserir no banco de dados
  await prisma.deck.createMany({
    data: decks,
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

import { PrismaClient } from '@prisma/client'

import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export const categories = [
  { name: 'punishment', id: '01JG9RDWW309X41GHWZZTZG2M3' },
  { name: 'challenge', id: '01JG9RDWW49BQEFQTDM869D6JD' },
  { name: 'vote', id: '01JG9RDWW4VADK1W9NST3G1PQS' },
  { name: 'action', id: '01JG9RDWW4044WREVFT8KFCF0E' },
  { name: 'truthOrDare', id: '01JG9RDWW48NC438BE9C8NF9K4' },
  { name: 'personal', id: '01JG9RDWW459H126X2R10B3MDV' },
  { name: 'truth', id: '01JG9RDWW4DQ0DP7B1QQF91GF3' },
  { name: 'lie', id: '01JG9RDWW4N2JACN5FPJ5FV2QN' },
  { name: 'discord', id: '01JG9RDWW4HAA4GW6JQR8YWZN9' },
  { name: 'gossip', id: '01JG9RDWW4CVKW18PN6XQP8AV3' },
  { name: 'opinion', id: '01JG9RDWW4PBQYM49YRJB4VCGW' },
]

const deck = [
  { id: '01JG9RK4WN8X5HDT67BSWX5VJ8' },
  { id: '01JG9RK4WNJBZ76PZVPRZ3683F' },
]

async function main() {
  const cards = []

  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
      cards.push({
        categoryId: category.id,
        description: faker.lorem.sentence(),
        image: faker.image.url(),
        weight: faker.number.int({ min: 1, max: 10 }),
        shots: faker.number.int({ min: 1, max: 10 }),
        deckId: deck[faker.number.int({ min: 0, max: 1 })].id,
        isFree: true,
      })
    }
  }

  // Inserir no banco de dados
  await prisma.card.createMany({
    data: cards,
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

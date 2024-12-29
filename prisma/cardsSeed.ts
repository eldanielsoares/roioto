import { PrismaClient } from '@prisma/client'

import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

export const categories = [
  { name: 'punishment', id: '01JGA29GF35TSHFB4NY4G79M5B' },
  { name: 'challenge', id: '01JGA29GF3YBV4BPSD5AZ2A43T' },
  { name: 'vote', id: '01JGA29GF3ARFRWA143XJJQWPE' },
  { name: 'action', id: '01JGA29GF3ER47ASEGS8T5DR95' },
  { name: 'truthOrDare', id: '01JGA29GF32GXNZA7NEWYGTJZC' },
  { name: 'personal', id: '01JGA29GF3DJKCCG6WAANQ2ZFB' },
  { name: 'truth', id: '01JGA29GF4Y6Y57S3BXHQKH6GY' },
  { name: 'lie', id: '01JGA29GF4EPMXZCEFN2WM9X9B' },
  { name: 'discord', id: '01JGA29GF4EDDBBQZMNRQNHN60' },
  { name: 'gossip', id: '01JGA29GF4MA8FKA6TP48S4SGC' },
  { name: 'opinion', id: '01JGA29GF41SXQ2CDJBVAV3FR9' },
]

const deck = [
  { id: '01JGA2CS3ETPTSJH5JWSZFCEVD' },
  { id: '01JGA2CS3FX0VXQ005E7JKKD5M' },
]

async function main() {
  const cards = []

  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
      cards.push({
        id: ulid(),
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

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    profile: {
      create: {
        bio: 'Software engineer and open-source enthusiast.',
        age: 29,
      },
    },
    roles: {
      connectOrCreate: [
        { where: { name: 'Admin' }, create: { name: 'Admin' } },
        { where: { name: 'Editor' }, create: { name: 'Editor' } },
      ],
    },
    orders: {
      create: [
        { totalAmount: 99.99 },
        { totalAmount: 49.99 },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    profile: {
      create: {
        bio: 'Digital artist and designer.',
        age: 34,
      },
    },
    roles: {
      connectOrCreate: [
        { where: { name: 'Viewer' }, create: { name: 'Viewer' } },
      ],
    },
    orders: {
      create: [
        { totalAmount: 149.99 },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    profile: {
      create: {
        bio: 'DevOps engineer with a passion for automation.',
        age: 40,
      },
    },
    roles: {
      connectOrCreate: [
        { where: { name: 'Admin' }, create: { name: 'Admin' } },
        { where: { name: 'Viewer' }, create: { name: 'Viewer' } },
      ],
    },
    orders: {
      create: [
        { totalAmount: 199.99 },
        { totalAmount: 99.99 },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)

  // Seed users with profiles, roles, and orders
  for (const user of userData) {
    const createdUser = await prisma.user.create({
      data: user,
    })
    console.log(`Created user with id: ${createdUser.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

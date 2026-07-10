import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const products = await prisma.product.findMany()
    console.log("Success:", products)
  } catch (error) {
    console.error("Prisma Error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

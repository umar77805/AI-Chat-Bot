import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

export const productRepository = {
  getProduct(productId: number) {
    return prisma.product.findFirst({
      where: { id: productId }
    })
  }
}
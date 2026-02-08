import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Review } from "../generated/prisma/client";
import dayjs from "dayjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

export const reviewRepository = {
  getReviews(productId: number, limit?: number): Promise<Review[]> {
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  },

  storeReviewSummary(productId: number, summary: string) {
    const now = new Date();
    const expiresAt = dayjs().add(7, 'days').toDate();
    const data = {
      content: summary,
      generatedAt: now,
      expiresAt: expiresAt,
      productId
    }

    return prisma.summary.upsert({
      where: { productId },
      update: data,
      create: data
    })
  },

  async getReviewSummary(productId: number): Promise<string | null> {
    const summaryObj = await prisma.summary.findFirst({
      where: {
        AND: [
          { productId },
          { expiresAt: { gt: new Date() } }
        ]
      }
    });

    return summaryObj ? summaryObj.content : null;
  }
}
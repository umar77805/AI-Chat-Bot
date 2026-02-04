import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Review } from "../generated/prisma/client";
import OpenAI from "openai";

export const reviewService = {
  async getReviews(productId: number): Promise<Review[]> {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter })


    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
    });
  },

  async summarizeReviews(productId: number, limit?: number): Promise<string> {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter })
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    const joinedReviews = reviews.map((review) => review.content).join('\n\n');
    const prompt = `
    You are a professional summarizer. Summarize these below reviews of a product:
    ${joinedReviews}
    
    Keep the total summary short, no more than 500 tokens. Include the positives,
    negatives and necessary information needed for a customer to buy this product.
    Keep a friendly tone and be straight to the point.
    `;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const summary = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.3,
      max_output_tokens: 500,
    })

    return summary.output_text;
  }
}
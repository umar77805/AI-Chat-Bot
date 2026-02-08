import { llmClient } from "../llm/client";
import template from '../prompts/ProductReviewSummarize.txt'
import { reviewRepository } from "../repositories/review.repository";

export const reviewService = {

  async summarizeReviews(productId: number, limit?: number): Promise<string> {
    const existingReviewSummary = await reviewRepository.getReviewSummary(productId);

    if (existingReviewSummary) {
      return existingReviewSummary
    }

    const reviews = await reviewRepository.getReviews(productId, limit);
    const joinedReviews = reviews.map((review) => review.content).join('\n\n');
    const prompt = template.replace('{{reviews}}', joinedReviews);

    const { text: summary } = await llmClient.generateText({
      model: 'gpt-4o-mini',
      prompt,
      temperature: 0.3,
      maxTokens: 500,
    })

    await reviewRepository.storeReviewSummary(productId, summary);
    return summary;
  }
}
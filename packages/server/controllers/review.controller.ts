import type { Request, Response } from "express";
import { reviewService } from "../services/review-service";
import { productRepository } from "../repositories/product.repository";
import { reviewRepository } from "../repositories/review.repository";

export const reviewController = {
  async getReviews(req: Request, res: Response) {
    const { id } = req.params;

    const productId = Number(id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid Product ID' });
      return;
    }

    const product = await productRepository.getProduct(productId);
    if (!product) {
      res.status(404).json({ error: "Invalid product" });
      return;
    }

    const reviews = await reviewRepository.getReviews(productId);
    const summary = await reviewRepository.getReviewSummary(productId);
    res.status(200).json({
      summary,
      reviews
    });
  },

  async summarizeReviews(req: Request, res: Response) {
    const { id } = req.params;

    const productId = Number(id);
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid Product ID' });
      return;
    }

    const product = await productRepository.getProduct(productId);
    if (!product) {
      res.status(404).json({ error: "Invalid product" });
      return;
    }

    const reviews = await reviewRepository.getReviews(productId, 1);
    if (!reviews.length) {
      res.status(400).json({ error: "No reviews for the given product" });
      return;
    }

    const summary = await reviewService.summarizeReviews(productId, 10);
    res.json({ summary })
  }
}
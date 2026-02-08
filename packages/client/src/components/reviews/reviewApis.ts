import axios from "axios";

export type Review = {
  id: string;
  author: string;
  rating: number;
  content: string;
};

export type GetReviewResponse = {
  summary: string | null;
  reviews: Review[];
};

export const reviewApi = {
  async fetchReviews(productId: string) {
    const { data } = await axios.get<GetReviewResponse>(
      `/api/products/${productId}/reviews`,
    );
    return data;
  },

  async sumarizeReviews(productId: string) {
    const { data } = await axios.post<{ summary: string }>(
      `api/products/${productId}/reviews/summarize`,
    );
    return data;
  }
}
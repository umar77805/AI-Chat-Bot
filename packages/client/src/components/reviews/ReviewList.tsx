import ReviewStar from "./ReviewStar";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { HiOutlineSparkles } from "react-icons/hi2";
import { reviewApi, type GetReviewResponse } from "./reviewApis";

type Props = {
  productId: string;
};

const ReviewList = ({ productId }: Props) => {
  const {
    mutate: handleSummary,
    isPending: isSummaryLoading,
    error: summaryFetchError,
    data: summaryData,
  } = useMutation({
    mutationFn: () => reviewApi.sumarizeReviews(productId),
  });

  const {
    data: reviewData,
    error: reviewsError,
    isLoading: isReviewsLoading,
  } = useQuery<GetReviewResponse>({
    queryKey: ["reviews", productId],
    queryFn: () => reviewApi.fetchReviews(productId),
  });

  if (isReviewsLoading) {
    const placeholders = Array.from({ length: 4 }, (_, idx) => idx + 1);
    return placeholders.map((placeholder) => (
      <div key={placeholder} className="flex flex-col gap-5">
        <Skeleton width={150} />
        <Skeleton width={100} />
        <Skeleton count={2} />
      </div>
    ));
  }

  if (reviewsError) {
    return <p className="text-red-500">Something went wrong</p>;
  }

  const currSummary = reviewData?.summary || summaryData?.summary;

  return (
    <div>
      <div className="mb-5">
        {currSummary ? (
          <p>{currSummary}</p>
        ) : (
          <>
            <Button
              disabled={isSummaryLoading}
              onClick={() => handleSummary()}
              className="cursor-pointer"
            >
              <HiOutlineSparkles />
              {isSummaryLoading ? "Summarizing" : "Summarize"}
            </Button>
            {summaryFetchError ? (
              <p>Error while summarizing. Please retry!</p>
            ) : null}
          </>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {reviewData?.reviews.map((review) => (
          <div key={review.id}>
            <div className="font-semibold">{review.author}</div>
            <div>
              <ReviewStar rating={review.rating} />
            </div>
            <p className="py-2">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;

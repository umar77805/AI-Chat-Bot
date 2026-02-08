import { FaRegStar, FaStar } from "react-icons/fa6";

type Props = {
  rating: number;
};

const ReviewStar = ({ rating }: Props) => {
  const placeholders = Array.from({ length: 5 }, (_, idx) => idx + 1);
  return (
    <div className="flex gap-2 text-yellow-500">
      {placeholders.map((placeholder) =>
        placeholder <= rating ? (
          <FaStar key={placeholder} />
        ) : (
          <FaRegStar key={placeholder} />
        ),
      )}
    </div>
  );
};

export default ReviewStar;

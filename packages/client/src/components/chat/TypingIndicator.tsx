const TypingIndicator = () => {
  return (
    <div className="p-4 bg-gray-200 self-start rounded-xl flex gap-1">
      <Dot />
      <Dot className="[animation-delay: 0.2s]" />
      <Dot className="[animation-delay: 0.4s]" />
    </div>
  );
};

type DotProps = {
  className?: string;
};

const Dot = ({ className }: DotProps) => (
  <div
    className={`w-2 aspect-square animate-pulse bg-gray-600 rounded-full ${className}`}
  />
);

export default TypingIndicator;

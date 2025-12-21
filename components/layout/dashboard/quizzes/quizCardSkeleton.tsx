export const QuizCardSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-3 justify-center items-center p-2 md:p-3 bg-card rounded-md
      border border-gray-20 animate-pulse"
    >
      <div className="h-6 w-3/4 bg-gray-30 rounded" />
      <div className="flex justify-center items-center max-w-56 max-h-56 w-full aspect-square">
        <div className="w-full h-full bg-gray-30 rounded" />
      </div>
      <div className="w-full h-10 bg-gray-30 rounded" />
    </div>
  );
};

export const ProfileCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full lg:w-1/3 p-4 bg-card border border-gray-20 rounded-md animate-pulse">
      <div className="w-32 h-32 rounded-full bg-gray-30" />
      <div className="w-full flex flex-col gap-3 text-center">
        <div className="w-40 h-5 bg-gray-30 rounded mx-auto" />
        <div className="w-24 h-3 bg-gray-30 rounded mx-auto" />
        <div className="w-52 h-4 bg-gray-30 rounded mx-auto" />
      </div>
      <div className="flex gap-4 mt-4 w-full">
        <div className="flex-1 h-10 bg-gray-30 rounded" />
        <div className="flex-1 h-10 bg-gray-30 rounded" />
      </div>
    </div>
  );
};

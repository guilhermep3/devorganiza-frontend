export const TopInfosSkeleton = () => {

  return (
    <section className="flex flex-col">
      <div className="mb-4">
        <div className="h-8 bg-card rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-5 bg-card rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-card border border-gray-20 rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-gray-30 rounded"></div>
            </div>
            <div className="h-6 bg-gray-30 rounded mb-1"></div>
            <div className="h-4 bg-gray-30 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </section>
  );
};
export const TaskItemSkeleton = () => {

  return (
    <div className="bg-card p-4 rounded-lg flex flex-col justify-between gap-3 animate-pulse">
      <div>
        <div className="bg-gray-30 h-4 w-3/4 rounded"></div>
        <div className="mt-2 bg-gray-20 h-3 w-1/2 rounded"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="bg-gray-20 h-3 w-1/4 rounded"></div>
        <div className="flex gap-4">
          <div className="bg-gray-30 h-6 w-6 rounded-full"></div>
          <div className="bg-gray-30 h-6 w-6 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

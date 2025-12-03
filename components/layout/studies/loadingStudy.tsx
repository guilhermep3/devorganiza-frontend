export const LoadingStudy = () => {
  return (
    <div className="flex flex-col border border-gray-30 rounded-md overflow-hidden animate-pulse">
      <div className="w-full h-28 md:h-40 bg-gray-20"></div>
      <div className="flex flex-col gap-3 border-t border-gray-30 p-2 md:p-3">
        <div className="flex flex-col">
          <div className="h-5 bg-gray-20 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-20 rounded w-1/2"></div>
        </div>
        <div className="flex mt-5">
          <div
            className="flex-1 flex justify-center items-center gap-1 font-bold text-sm md:text-lg text-main-30"
            title="Total de tarefas"
          >
            <div className="h-5 w-5 bg-gray-20 rounded-full"></div>
            <div className="h-5 bg-gray-20 rounded w-6"></div>
          </div>
          <div
            className="flex-1 flex justify-center items-center gap-1 font-bold text-sm md:text-lg text-green-20 border-x border-gray-20"
            title="Tarefas finalizadas"
          >
            <div className="h-5 w-5 bg-gray-20 rounded-full"></div>
            <div className="h-5 bg-gray-20 rounded w-6"></div>
          </div>
          <div
            className="flex-1 flex justify-center items-center gap-1 font-bold text-sm md:text-lg text-main-40"
            title="Progresso"
          >
            <div className="h-5 w-5 bg-gray-20 rounded-full"></div>
            <div className="h-5 bg-gray-20 rounded w-6"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-20 rounded w-full mt-4"></div>
      </div>
    </div>
  );
}
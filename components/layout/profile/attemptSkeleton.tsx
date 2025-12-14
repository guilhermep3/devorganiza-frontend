export const AttemptSkeleton = () => {

  return (
    <tr className="rounded-lg shadow-sm animate-pulse" >
      <td className="rounded-l-lg pb-3" >
        <div className="flex gap-3 items-center" >
          <div className="w-8 h-8 rounded-sm bg-gray-20" > </div>
          < div className="h-4 bg-gray-20 rounded w-32" > </div>
        </div>
      </td>
      < td className="text-lg font-semibold text-main-40" >
        <div className="h-6 bg-gray-20 rounded w-16" > </div>
      </td>
      < td className="rounded-r-lg" >
        <div className="h-4 bg-gray-20 rounded w-20" > </div>
      </td>
    </tr>
  )
}
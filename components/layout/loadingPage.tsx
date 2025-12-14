import { Loader2 } from "lucide-react"

export const LoadingPage = () => {

  return (
    <div className="w-full h-full flex justify-center items-center my-14">
      <Loader2 className="w-20 h-20 animate-spin text-gray-50" />
    </div>
  )
}
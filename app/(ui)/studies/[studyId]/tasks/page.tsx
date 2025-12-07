"use client"
import { useParams } from "next/navigation"

export default function Page() {
  const params = useParams()

  return (
    <div>
      studies/:{params.studyId}/tasks
    </div>
  )
}
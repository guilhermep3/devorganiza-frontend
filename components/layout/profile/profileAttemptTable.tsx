"use client"
import { useQuizAttempts } from "@/src/api/quiz/useQuizAttempts"
import Image from "next/image"

export const ProfileAttemptTable = () => {
  const { data, loading } = useQuizAttempts();

  return (
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr>
          <th className="text-left pb-3 border-b-2 border-gray-20">Quiz</th>
          <th className="text-left pb-3 border-b-2 border-gray-20">Acertos</th>
          <th className="text-left pb-3 border-b-2 border-gray-20">Tempo</th>
        </tr>
      </thead>
      <tbody>
        <tr className="rounded-lg shadow-sm">
          <td className="rounded-l-lg pb-3">
            <div className="flex gap-3 items-center">
              <Image src={`/auth.jpg`} alt="foto quiz"
                width={32} height={32} className="w-8 h-8 rounded-sm object-cover"
              />
              HTML
            </div>
          </td>
          <td className="text-lg font-semibold text-main-40">30/30</td>
          <td className="rounded-r-lg">24 min.</td>
        </tr>
        <tr className="rounded-lg shadow-sm">
          <td className="rounded-l-lg pb-3">
            <div className="flex gap-3 items-center">
              <Image src={`/auth.jpg`} alt="foto quiz"
                width={32} height={32} className="w-8 h-8 rounded-sm object-cover"
              />
              HTML
            </div>
          </td>
          <td className="text-lg font-semibold text-lime-600">27/30</td>
          <td className="rounded-r-lg">25 min.</td>
        </tr>
        <tr className="rounded-lg shadow-sm">
          <td className="rounded-l-lg pb-3">
            <div className="flex gap-3 items-center">
              <Image src={`/auth.jpg`} alt="foto quiz"
                width={32} height={32} className="w-8 h-8 rounded-sm object-cover"
              />
              CSS
            </div>
          </td>
          <td className="text-lg font-semibold text-green-600">24/30</td>
          <td className="rounded-r-lg">27 min.</td>
        </tr>
        <tr className="rounded-lg shadow-sm">
          <td className="rounded-l-lg pb-3">
            <div className="flex gap-3 items-center">
              <Image src={`/auth.jpg`} alt="foto quiz"
                width={32} height={32} className="w-8 h-8 rounded-sm object-cover"
              />
              CSS
            </div>
          </td>
          <td className="text-lg font-semibold text-emerald-600">22/30</td>
          <td className="rounded-r-lg">31 min.</td>
        </tr>
      </tbody>
    </table>
  )
}
"use client"
import { useQuizAttempts } from "@/src/api/quiz/useQuizAttempts"
import Image from "next/image"
import { AttemptSkeleton } from "./attemptSkeleton";
import { useEffect, useState } from "react";
import { QuizzesAttempt } from "@/src/types/quiz";

export const ProfileAttemptTable = () => {
  const { data, isLoading } = useQuizAttempts();
  const [sortedAttempts, setSortedAttempts] = useState<any>([]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}m ${remainingSeconds}s`;
  };

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setSortedAttempts([...data].sort(
        (a, b) =>
          new Date(b.startedAt).getTime() -
          new Date(a.startedAt).getTime()
      ))
    }
  }, [isLoading])

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
        {!isLoading ? (
          sortedAttempts.slice(0, 5).map((attempt: QuizzesAttempt) => (
            <tr key={attempt.id} className="rounded-lg shadow-sm">
              <td className="rounded-l-lg pb-3">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8">
                    <Image src={`${attempt.quizImage}`} alt="foto quiz"
                      width={32} height={32}
                      className=" rounded-sm object-cover"
                    />
                  </div>
                  Quiz {attempt.quizTitle}
                </div>
              </td>
              <td className="text-lg font-semibold text-main-40">
                {attempt.score}/30
              </td>
              <td className="rounded-r-lg">
                {formatTime(attempt.durationSec)}
              </td>
            </tr>
          ))
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <AttemptSkeleton key={index} />
          ))
        )}
      </tbody>
    </table>
  )
}
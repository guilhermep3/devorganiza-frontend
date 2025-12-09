import { Button } from "@/components/button"
import { Quiz } from "@/src/types/quiz"
import Image from "next/image"

export const QuizCard = ({ quiz, locked }: { quiz: Quiz, locked?: boolean }) => {
  return (
    <div
      className={`flex flex-col gap-3 justify-center items-center p-2 md:p-3 bg-card rounded-md
        border border-gray-20 ${!locked && "hover:border-main-30"} transition`}
      style={{
        opacity: locked ? 0.5 : 1,
        cursor: locked ? 'not-allowed' : '',
        filter: locked ? "brightness(0.75)" : "brightness(1)"
      }}
    >
      <p className="text-center text-lg md:text-xl font-bold">{quiz.title}</p>
      <div className="flex justify-center items-center max-w-56 max-h-56 w-full aspect-square">
        <Image
          src={`${quiz.imageUrl}`} alt={quiz.title}
          width={320} height={320}
          className="w-full h-full object-contain"
        />
      </div>
      <Button className={`w-full h-full ${locked && "pointer-events-none"}`} href={`/quizzes/${quiz.id}`}>
        Iniciar
      </Button>
    </div>
  )
}

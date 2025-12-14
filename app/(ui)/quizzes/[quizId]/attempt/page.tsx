"use client"
import { Button as ButtonCN } from "@/components/ui/button";
import { useDeleteAttempt } from "@/src/api/quiz/useDeleteAttempt";
import { useFinishAttempt } from "@/src/api/quiz/useFinishAttempt";
import { useStartAttempt } from "@/src/api/quiz/useStartAttempt";
import { useQuizStore } from "@/src/store/quiz-store"
import { AttemptAnswer, QuestionAlternatives } from "@/src/types/quiz";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { quiz } = useQuizStore();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionAlternatives | null>(quiz?.questions![questionIndex]!);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
  const { createAttempt } = useFinishAttempt();
  const { startAttempt } = useStartAttempt();
  const { deleteAttempt } = useDeleteAttempt();

  useEffect(() => {
    setCurrentQuestion(quiz?.questions![questionIndex]!);
  }, [questionIndex]);

  useEffect(() => {
    startAttempt(quiz!.id!);
  }, [])

  function handleConfirm() {
    if (!selected) return;
    setQuestionIndex(questionIndex === quiz?.questions.length! - 1 ? questionIndex : questionIndex + 1);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion!.id, answerId: selected }
    ]);
    setSelected(null);

    if (questionIndex === quiz?.questions.length! - 1) {
      finishAttempt();
    }
  }

  function finishAttempt() {
    createAttempt(quiz!.id!, answers);
    router.push(`/quizzes/${quiz?.id}/finish`);
  }

  function handleDeleteAttempt() {
    deleteAttempt(quiz?.id!);
    router.push('/quizzes')
  }

  return (
    <div className="layoutDiv">
      <div className="flex items-center gap-5 text-sm">
        <p>Questão {questionIndex + 1} de 30</p>
        <span>|</span>
        <div className="flex items-center gap-2">
          {quiz?.imageUrl &&
            <Image src={`${quiz?.imageUrl}`} alt={quiz?.title!}
              width={20} height={20}
            />
          }
          <p>{quiz?.title ?? 'Título'}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto h-full">
        <p className="text-2xl md:text-3xl font-extrabold">Questão {questionIndex + 1}</p>
        <p className="text-base md:text-lg">{currentQuestion?.question}</p>
        <div className="flex flex-col gap-3 mt-6">
          {currentQuestion?.alternatives.map((a) => (
            <div key={a.id}
              className={`flex items-center justify-between p-4 bg-card hover:bg-gray-20/25 transition rounded-md text-sm md:text-base cursor-pointer border 
                ${selected === a.id ? 'border-main-30' : 'border-transparent'}
                `}
              onClick={() => setSelected(a.id)}
            >
              {a.text}
              {selected === a.id && <CheckCircle className="stroke-main-30" />}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <ButtonCN className="bg-gray-20 hover:bg-gray-30 text-foreground" size={"lg"}
            onClick={handleDeleteAttempt}
          >
            Desistir
          </ButtonCN>
          <ButtonCN className="bg-main-30 hover:bg-main-50 text-white" size={"lg"}
            onClick={handleConfirm}
          >
            {questionIndex === quiz?.questions.length! - 1 ? 'Confirmar e finalizar' : 'Confirmar'}
          </ButtonCN>
        </div>
      </div>
    </div>
  )
}
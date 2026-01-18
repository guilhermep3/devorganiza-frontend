"use client"
import { LoadingPage } from "@/components/layout/loadingPage";
import { Button as ButtonCN } from "@/components/ui/button";
import { useDeleteAttempt } from "@/src/api/quiz/useDeleteAttempt";
import { useFinishAttempt } from "@/src/api/quiz/useFinishAttempt";
import { useQuiz } from "@/src/api/quiz/useQuiz";
import { useStartAttempt } from "@/src/api/quiz/useStartAttempt";
import { useQuizStore } from "@/src/store/quiz-store"
import { AttemptAnswer, QuestionAlternatives } from "@/src/types/quiz";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const attemptStartedRef = useRef(false);
  const quizId = params.quizId as string;
  const { data, isLoading } = useQuiz(quizId);
  const { quiz } = useQuizStore();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionAlternatives | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AttemptAnswer[]>([]);
  const finishAttempt = useFinishAttempt(quizId);
  const startAttempt = useStartAttempt(quizId);
  const deleteAttempt = useDeleteAttempt(quizId);

  useEffect(() => {
    if (!quiz) return;
    setCurrentQuestion(quiz?.questions![questionIndex] ?? null);
  }, [quiz, questionIndex]);

  useEffect(() => {
    if (!quiz?.id) return;

    attemptStartedRef.current = false;
  }, [quiz?.id]);

  useEffect(() => {
    if (!quiz?.id) return;
    if (attemptStartedRef.current) return;

    attemptStartedRef.current = true;
    startAttempt.mutate();
  }, [quiz?.id]);

  function handleConfirm() {
    if (!selected || !quiz || !currentQuestion) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, answerId: selected }
    ];

    setAnswers(newAnswers);
    setSelected(null);

    if (questionIndex === quiz.questions.length - 1) {
      finishAttempt.mutate(newAnswers, {
        onSuccess: () => {
          router.push(`/quizzes/${quiz.id}/finish`);
        },
      });
      return;
    }

    setQuestionIndex(prev => prev + 1);
  }

  function handleDeleteAttempt() {
    deleteAttempt.mutate(undefined, {
      onSuccess: () => {
        router.push("/quizzes");
      },
    });
  }


  return (
    <div className="layoutDiv">
      {isLoading ? (
        <LoadingPage />
      ) : data ? (
        <>
          <div className="flex items-center gap-5 text-sm">
            <p>Questão {questionIndex + 1} de 30</p>
            <span>|</span>
            <div className="flex items-center gap-2">
              {quiz?.imageUrl &&
                <Image src={`${quiz?.imageUrl}`} alt={quiz?.title}
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
        </>
      ) : (
        <div className="text-gray-40 w-full">Nenhum dado encontrado</div>
      )}
    </div>
  )
}
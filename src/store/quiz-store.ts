import { create } from "zustand";
import { FullQuiz } from "../types/quiz";
import { persist } from "zustand/middleware";

interface QuizStore {
  quiz: FullQuiz | null;
  insertQuiz: (quiz: FullQuiz) => void;
  clearQuiz: () => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quiz: null,
      insertQuiz: (quiz: FullQuiz) => set({ quiz }),
      clearQuiz: () => set({ quiz: null})
    }),
    { name: "Quiz-storage" }
  )
)
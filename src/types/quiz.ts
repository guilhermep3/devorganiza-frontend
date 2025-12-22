export interface Quiz {
  id: string;
  title: string;
  description: string;
  type: string;
  imageUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Alternative {
  id: string;
  text: string;
  createdAt: Date | string;
}

export interface Question {
  id: string;
  question: string;
  quizId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface QuestionAlternatives extends Question {
  alternatives: Alternative[];
}

export interface FullQuiz extends Quiz {
  questions: QuestionAlternatives[];
}

export interface AttemptAnswer {
  questionId: string;
  answerId: string;
}

export interface QuizzesAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  quizImage: string;
  startedAt: string;
  finishedAt: string;
  score: number;
  durationSec: number;
}

export interface FinishAttempt {
  attempt: string;
  duration: number;
  message: string;
  score: number;
}
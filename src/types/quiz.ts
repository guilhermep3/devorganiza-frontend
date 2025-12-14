export interface Quiz {
  id: string;
  title: string;
  description: string;
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

export interface Attempt {
  id: string;
  userId: string;
  quizId: string;
  startedAt: string;
  finishedAt: string | null;
  score: number;
  durationSec: number;
}

export interface AttemptReturn {
  userId: string;
  quizId: string;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  score: number;
}

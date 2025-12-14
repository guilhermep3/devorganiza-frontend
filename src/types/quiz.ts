export interface FullQuiz {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  questions: {
    id: string;
    question: string;
    quizId: string;
    createdAt: Date;
    updatedAt: Date;
    alternatives: {
      id: string;
      text: string;
      createdAt: Date;
    }[];
  }[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Questions {
  id: string;
  question: string;
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alternatives {
  id: string;
  text: string;
  createdAt: Date;
}

export interface QuestionAlternatives {
  id: string;
  question: string;
  quizId: string;
  createdAt: Date;
  updatedAt: Date;
  alternatives: {
    id: string;
    text: string;
    createdAt: Date;
  }[];
}

export interface AttemptAnswer {
  questionId: string, answerId: string
}

export interface AttemptReturn {
  attempt: {
    id: string;
    userId: string;
    quizId: string;
    startedAt: string;
    finishedAt: string | null;
    score: number;
    durationSec: number;
  };
  duration: number;
  score: number;
  message: string;
}

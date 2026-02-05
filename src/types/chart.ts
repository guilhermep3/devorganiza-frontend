export interface WeeklyProductivity {
  weekDay: string,
  criado: number,
  finalizado: number
}

export interface TasksByType {
  type: string,
  tasks: number,
}

export interface FinishedTasksByMonth {
  month: string,
  tarefa: string,
}

export interface AverageTimeFinish {
  estudo: string,
  media: number,
}

export interface AverageScore {
  quizId: string,
  quizTitle: string,
  averageScore: number | null,
  attempts: string,
}

export interface FasterAttempts {
  quiz: string,
  duracao: number
}
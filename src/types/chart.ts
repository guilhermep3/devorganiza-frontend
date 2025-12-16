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
  tarefa: number,
}

export interface AverageScore {
  quizId: string,
  quizTitle: string,
  averageScore: string | null,
  attempts: string,
}

export interface FasterAttempts {
  quiz: string,
  duracao: string
}
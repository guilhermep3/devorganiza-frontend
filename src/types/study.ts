export type StudyTask = {
  study: Study;
  tasks: Task[];
};

export interface Study {
  id: number;
  name: string;
  type?: string | null;
  link?: string | null;
  description?: string | null;
  status?: string;
  progress?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  userId: number;
}

export interface Task {
  id: number;
  title: string;
  link: string;
  done: boolean;
  studyId: string;
  createdAt: string;
  finishIn: string;
  finishedAt: string | null;
}
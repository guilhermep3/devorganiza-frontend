import { Clock9, ListCheck, LucideIcon, NotebookPen } from "lucide-react";

export interface AboutData {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const aboutData: AboutData[] = [
  {
    id: 1,
    title: 'Organize',
    description: 'Crie seus estudos e tarefas organizando seus aprendizados',
    icon: NotebookPen
  },
  {
    id: 2,
    title: 'Economize Tempo',
    description: 'Estude com mais facilidade pela organização e economize tempo',
    icon: Clock9
  },
  {
    id: 3,
    title: 'Pratique',
    description: 'Pratique seus estudos com nossos quizzes de tecnologias da programação',
    icon: ListCheck
  },
]
import { ChartNoAxesCombined, CircleQuestionMark, ListChecks, LucideIcon, NotebookPen } from "lucide-react";

export interface ServicesData {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const servicesData: ServicesData[] = [
  {
    id: 1,
    title: 'Organize seus estudos',
    description: 'Com nossa ajuda, você otimiza a organização dos seus estudos e acompanha o progresso das tarefas, visualizando rapidamente o que está quase concluído pela porcentagem de conclusão.',
    icon: NotebookPen
  },
  {
    id: 2,
    title: 'Gerencie suas tarefas',
    description: 'Facilite a administração das suas tarefas diárias e acompanhe o andamento de cada uma. Veja o status de conclusão para não perder nenhum prazo importante.',
    icon: ListChecks
  },
  {
    id: 3,
    title: 'Analise seu desempenho',
    description: 'Acompanhe sua evolução nos estudos de programação com nosso painel de desempenho. Identifique seus pontos fortes e áreas a melhorar para direcionar seus próximos passos.',
    icon: ChartNoAxesCombined
  },
  {
    id: 4,
    title: 'Pratique com quiz',
    description: 'Ao criar um estudo, você desbloqueia um quiz relacionado ao conteúdo para testar seus conhecimentos. Responda as perguntas e aumente sua confiança no tema.',
    icon: CircleQuestionMark
  },
]

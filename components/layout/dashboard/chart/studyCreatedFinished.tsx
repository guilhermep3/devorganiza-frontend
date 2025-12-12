"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Task } from "@/src/types/study"

export const description = "A multiple bar chart"

// const chartData = [
//   { semana: "Segunda", criado: 186, finalizado: 80 },
//   { semana: "Terça", criado: 305, finalizado: 200 },
//   { semana: "Quarta", criado: 237, finalizado: 120 },
//   { semana: "Quinta", criado: 73, finalizado: 190 },
//   { semana: "Sexta", criado: 209, finalizado: 130 },
//   { semana: "Sábado", criado: 214, finalizado: 140 },
//   { semana: "Domingo", criado: 214, finalizado: 140 },
// ]

const weekDays = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
  'Domingo',
]

const chartConfig = {
  criado: {
    label: "criado",
    color: "var(--color-main-30)",
  },
  finalizado: {
    label: "finalizado",
    color: "var(--color-main-40)",
  },
} satisfies ChartConfig

type props = {
  data: Record<number, Task[]>;
}
export function StudyCreatedFinishedChart({ data }: props) {
  const chartData = Object.entries(data).map(([week, task]) => {
    const totalTasks = task.length;
    const totalFinishedTasks = task.filter(t => t.done).length;

    return {
      semana: weekDays[Number(week)],
      criado: totalTasks,
      finalizado: totalFinishedTasks
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="chartTitleCustom">Tarefas criadas e finalizadas</CardTitle>
        <CardDescription>Ordenado Por semana</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="semana"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="criado" fill="var(--color-criado)" radius={4} />
            <Bar dataKey="finalizado" fill="var(--color-finalizado)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Aumento de 5,2% <TrendingUp className="h-4 w-4" /> de tarefas finalizadas nessa semana
        </div>
        <div className="text-muted-foreground leading-none">
          Terça-feira foi o dia que mais teve tarefas finalizadas
        </div>
      </CardFooter>
    </Card>
  )
}

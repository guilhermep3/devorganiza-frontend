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

export const description = "A multiple bar chart"

const chartData = [
  { study: "HTML", tarefas: 18, finalizadas: 8 },
  { study: "CSS", tarefas: 30, finalizadas: 20 },
  { study: "Javascript", tarefas: 23, finalizadas: 12 },
  { study: "Node.js", tarefas: 19, finalizadas: 7 },
  { study: "Python", tarefas: 20, finalizadas: 13 },
  { study: "PHP", tarefas: 14, finalizadas: 10 },
]

const chartConfig = {
  tarefas: {
    label: "tarefas",
    color: "var(--color-main-30)",
  },
  finalizadas: {
    label: "finalizadas",
    color: "var(--color-green-20)",
  },
} satisfies ChartConfig

export function TasksCompletedByStudyChart() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estudos com mais tarefas finalizadas</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="study"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 18)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="tarefas" fill="var(--color-tarefas)" radius={4} />
            <Bar dataKey="finalizadas" fill="var(--color-finalizadas)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          CSS tem 5% a mais de estudo comparado a Javascript
        </div>
        <div className="text-muted-foreground leading-none">
          PHP tem 5% a menos de tarefas comparado a Python
        </div>
      </CardFooter>
    </Card>
  )
}

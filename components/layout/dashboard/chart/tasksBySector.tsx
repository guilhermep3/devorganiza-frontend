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

export const description = "A bar chart"

const chartData = [
  { setor: "Front-end", tarefas: 186 },
  { setor: "Back-end", tarefas: 305 },
  { setor: "Ferramentas", tarefas: 237 },
]

const chartConfig = {
  tarefas: {
    label: "tarefas",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

export function TasksBySector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Média de tarefas por setor</CardTitle>
        <CardDescription>Tarefas separadas por Front-end, Back-end e Ferramentas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="setor"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tarefas" fill="var(--color-main-30)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Front-end tem 5% a mais de tarefas comparado a Back-end.
        </div>
        <div className="text-muted-foreground leading-none">
          Ferramentas tem 5% a menos de tarefas comparado a Back-end.
        </div>
      </CardFooter>
    </Card>
  )
}

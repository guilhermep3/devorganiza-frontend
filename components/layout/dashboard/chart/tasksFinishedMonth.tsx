"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A simple area chart"

const chartData = [
  { mes: "Janeiro", tarefa: 18 },
  { mes: "Fevereiro", tarefa: 30 },
  { mes: "Março", tarefa: 23 },
  { mes: "Abril", tarefa: 10 },
  { mes: "Maio", tarefa: 20 },
  { mes: "Junho", tarefa: 21 },
  { mes: "Julho", tarefa: 24 },
]

const chartConfig = {
  tarefa: {
    label: "tarefa",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

export function TasksFinishedMonthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="chartTitleCustom">Tarefas finalizadas por mês</CardTitle>
        <CardDescription>
          Média por mês
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="tarefa"
              type="natural"
              fill="var(--color-main-30)"
              fillOpacity={0.4}
              stroke="var(--color-main-60)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Aumento de 5,2% <TrendingUp className="h-4 w-4" /> de tarefas finalizadas no último mês
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Janeiro - Julho 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

"use client"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { calculateDifference, formatPercentage } from "@/src/utils/calc"
import type { WeeklyProductivity } from "@/src/types/chart"

const weekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
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

export function WeeklyProductivity({ data }: { data: WeeklyProductivity[] }) {
  const dataByWeekDay = Object.fromEntries(
    data.map(item => [Number(item.weekDay), item])
  );

  const chartData = weekDays.map((day, index) => {
    const tasksOfDay = dataByWeekDay[index] ?? [];

    return {
      semana: day,
      criado: tasksOfDay.criado ?? 0,
      finalizado: tasksOfDay.finalizado ?? 0,
    }
  })

  const todayIndex = new Date().getDay();
  const yesterdayIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  const todayData = chartData[todayIndex];
  const yesterdayData = chartData[yesterdayIndex];

  const createdDifference = calculateDifference(
    todayData.criado,
    yesterdayData.criado
  )

  const finishedDifference = calculateDifference(
    todayData.finalizado,
    yesterdayData.finalizado
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="chartTitleCustom">
          Tarefas criadas e finalizadas
        </CardTitle>
        <CardDescription>Ordenado por semana</CardDescription>
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
        <div className="chartFooter font-medium">
          {createdDifference >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-20" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          {createdDifference >= 0 ? "Aumento" : "Diminuição"} de{" "}
          <span className="font-bold">
            {formatPercentage(createdDifference)}%
          </span>{" "}
          de tarefas criadas de hoje pra ontem
        </div>
        <div className="chartFooter text-gray-50">
          {finishedDifference >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-20" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          {finishedDifference >= 0 ? "Aumento" : "Diminuição"} de{" "}
          <span className="font-bold">
            {formatPercentage(finishedDifference)}%
          </span>{" "}
          de tarefas finalizadas de hoje pra ontem
        </div>
      </CardFooter>
    </Card>
  )
}

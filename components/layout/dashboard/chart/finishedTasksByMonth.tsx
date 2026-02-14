"use client"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { calculateDifference, formatPercentage } from "@/src/utils/calc"
import type { FinishedTasksByMonth } from "@/src/types/chart"

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const chartConfig = {
  tarefa: {
    label: "tarefa",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

const finishedTasksByMonthLogic = (data: FinishedTasksByMonth[]) => {
  const chartData = months.map((month, index) => {
    const monthNumber = index + 1;
    const tasksByMonth = data.find(i =>
      Number(i.month) === Number(monthNumber)
    )

    return {
      mes: month,
      tarefa: Number(tasksByMonth?.tarefa ?? 0)
    }
  })

  const currentMonthIndex = new Date().getMonth();
  const previousMonthIndex =
    currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

  const currentMonthData = chartData[currentMonthIndex];
  const previousMonthData = chartData[previousMonthIndex];

  const currentFinished = Number(currentMonthData?.tarefa ?? 0);
  const previousFinished = Number(previousMonthData?.tarefa ?? 0);

  const finishedDifference = calculateDifference(
    currentFinished,
    previousFinished
  );

  const year = new Date().getFullYear()

  return { chartData, finishedDifference, year }
}

export function FinishedTasksByMonthChart({ data }: { data: FinishedTasksByMonth[] }) {
  const { chartData, finishedDifference, year } = finishedTasksByMonthLogic(data);

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
              type="monotone"
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
            <div className="chartFooter">
              {finishedDifference >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-20" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              {finishedDifference >= 0 ? "Aumento" : "Diminuição"} de{" "}
              <span className="font-bold">
                {formatPercentage(finishedDifference)}%
              </span>{" "}
              de tarefas finalizadas no último mês
            </div>
            <div className="chartFooter text-gray-50">
              Janeiro - Dezembro {year}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

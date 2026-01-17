"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart"
import { AverageTimeFinish } from "@/src/types/chart"
import { formatPercentage, handleTimeFormat } from "@/src/utils/calc"

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

export function AverageTimeFinishTaskChart({ data }: { data: AverageTimeFinish[] }) {
  const chartData = data.map((i) => ({
    ...i,
    media: (i.media ?? 0) / 60,
  }))

  const hasComparison = chartData.length >= 2;

  let difference = 0;

  if (hasComparison && chartData[1].media !== 0) {
    difference =
      ((chartData[0].media - chartData[1].media) /
        chartData[1].media) *
      100
  }

  const first = chartData[0]
  const second = chartData[1]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tempo médio para finalizar tarefas</CardTitle>
        <CardDescription>Organizado por estudos</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="estudo"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => { return value.length > 7 ? value.slice(0, 6) + '...' : value }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="media" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => handleTimeFormat(value, 'long')}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {second &&
            `${second.estudo} é finalizado aproximadamente ${formatPercentage(difference)}% mais rápido que ${first.estudo}.`
          }
        </div>
        <div className="text-muted-foreground leading-none">
          Comparação baseada no tempo médio de conclusão das tarefas.
        </div>
      </CardFooter>
    </Card>
  )
}

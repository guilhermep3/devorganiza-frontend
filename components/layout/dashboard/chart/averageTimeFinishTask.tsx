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
import { formatPercentage, formatTimeToMMSS } from "@/src/utils/calc"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

export function AverageTimeFinishTaskChart({ data }: { data: AverageTimeFinish[] }) {
  const chartData = data.map((i) => {
    const media = i.media;
    return {
      ...i,
      media: (media / 60)
    }
  })

  const [first, second] = chartData;
  const difference = ((first.media - second.media) / second.media) * 100;

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
              tickFormatter={(value) => value.slice(0, 3)}
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
                formatter={(value: number) => formatTimeToMMSS(value, 'long')}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {second.estudo} é finalizado aproximadamente {formatPercentage(difference)}% mais rápido que {first.estudo}.
        </div>
        <div className="text-muted-foreground leading-none">
          Comparação baseada no tempo médio de conclusão das tarefas.
        </div>
      </CardFooter>
    </Card>
  )
}

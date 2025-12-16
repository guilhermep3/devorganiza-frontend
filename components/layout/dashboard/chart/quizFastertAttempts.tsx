"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { FasterAttempts } from "@/src/types/chart"

// const chartData = [
//   { quiz: "HTML", duração: 10 },
//   { quiz: "CSS", duração: 11 },
// ]

const chartConfig = {
  duração: {
    label: "duração",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

export function QuizFasterAttemptsChart({ data }: { data: FasterAttempts[] }) {
  const chartData = data.map((i) => {
    const seconds = Number(i.duracao);
    return {
      ...i,
      duracao: Number(seconds / 60)
    }
  })

  function formatMinuteToMMSS(value: number) {
    const totalSeconds = Math.round(value * 60)
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tentativas de quizzes mais rápidas</CardTitle>
        <CardDescription>Quizzes finalizados no menor tempo</CardDescription>
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
              dataKey="quiz"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="duracao" fill="var(--color-main-30)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => formatMinuteToMMSS(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Quiz de HTML foi finalizado 1% mais rápido que o de CSS
        </div>
        <div className="text-muted-foreground leading-none">
          Quiz de Git foi finalizado 5% mais demorado que o de Python
        </div>
      </CardFooter>
    </Card>
  )
}

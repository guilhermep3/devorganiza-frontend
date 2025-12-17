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
import { formatTimeToMMSS } from "@/src/utils/calc"

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
    const seconds = i.duracao;
    return {
      ...i,
      duracao: seconds / 60
    }
  }).sort(
    (a, b) => a.duracao - b.duracao
  );

  const fastest = chartData[0];
  const slowest = chartData[chartData.length - 1];

  const difference =
    ((slowest.duracao - fastest.duracao) / slowest.duracao) * 100;

  const percentage = Math.abs(difference).toFixed(2);


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
                formatter={(value: number) => formatTimeToMMSS(value, 'short')}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Quiz de {fastest.quiz} foi finalizado aproximadamente {percentage}% mais rápido
          que o de {slowest.quiz}.
        </div>
        <div className="text-muted-foreground leading-none">
          Baseada no menor tempo registrado para conclusão dos quizzes.
        </div>
      </CardFooter>

    </Card>
  )
}

"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

export const description = "A bar chart with a label"

const chartData = [
  { quiz: "HTML", duração: 10 },
  { quiz: "CSS", duração: 11 },
  { quiz: "Javascript", duração: 14 },
  { quiz: "Node.js", duração: 17 },
  { quiz: "Python", duração: 20 },
  { quiz: "Git", duração: 21 },
]

const chartConfig = {
  duração: {
    label: "duração",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

export function QuizFasterAttemptsChart() {
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
            <Bar dataKey="duração" fill="var(--color-main-30)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
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

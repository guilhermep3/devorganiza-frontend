"use client"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

export const description = "A simple pie chart"

const chartData = [
  { quiz: "HTML", visitors: 29, fill: "var(--color-green-20)" },
  { quiz: "CSS", visitors: 27, fill: "var(--color-main-20)" },
  { quiz: "Javascript", visitors: 25, fill: "var(--color-main-30)" },
  { quiz: "Node.js", visitors: 20, fill: "var(--color-main-40)" },
  { quiz: "Python", visitors: 15, fill: "var(--color-green-10)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function QuizAverageScoreChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pontuação média por quiz</CardTitle>
        <CardDescription>Soma de todas as pontuações de tentativas de cada quiz</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey="quiz" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          HTML tem 5% a mais de média de pontuação comparado com CSS
        </div>
        <div className="text-muted-foreground leading-none">
          Node.js tem 5% a menos de média de pontuação comparado com Python
        </div>
      </CardFooter>
    </Card>
  )
}

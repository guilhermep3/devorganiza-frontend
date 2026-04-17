"use client"
import { TrendingUp } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { AverageScore } from "@/src/types/chart"

const chartConfig = {
  // HTML: {
  //   label: "HTML",
  //   color: "var(--color-secondary-20)",
  // },
  // CSS: {
  //   label: "CSS",
  //   color: "var(--color-main-20)",
  // },
} satisfies ChartConfig;

const colors = [
  "var(--color-main-30)",
  "var(--color-secondary-20)",
  "var(--color-main-50)",
  "var(--color-main-40)",
  "var(--color-main-20)",
  "var(--color-main-30)",
  "var(--color-secondary-20)",
  "var(--color-main-50)",
  "var(--color-main-40)",
  "var(--color-main-20)",
]

const quizAverageScoreLogic = (data: AverageScore[]) => {
  const chartData = [...data].map((i) => ({
    quiz: i.quizTitle,
    score: Number(i.averageScore) ?? 0
  })).sort(
    (a, b) => b.score - a.score
  ).slice(0, 5)

  const [first, second, last, penultimate] = [
    chartData[0],
    chartData[1],
    chartData[chartData.length - 1],
    chartData[chartData.length - 2],
  ]

  const differenceTop =
    second && second.score > 0
      ? ((first.score - second.score) / second.score) * 100 : 0

  const differenceBottom =
    penultimate && penultimate.score > 0
      ? ((penultimate.score - last.score) / penultimate.score) * 100 : 0;

  const topText = `${first.quiz} tem ${differenceTop.toFixed(0)}% a mais de média de pontuação que ${second.quiz}`;
  const bottomText = `${last.quiz} tem ${differenceBottom.toFixed(0)}% a menos de média de pontuação que ${penultimate.quiz}`;

  return { chartData, topText, bottomText }
}

export function QuizAverageScoreChart({ data }: { data: AverageScore[] }) {
  const {
    chartData, topText, bottomText
  } = quizAverageScoreLogic(data);

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
            <Pie data={chartData} dataKey="score" nameKey="quiz">
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.quiz}
                  fill={colors[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="chartFooter">
          <TrendingUp className="h-4 w-4 text-secondary-20" />
          {topText}
        </div>
        <div className="chartFooter text-muted-foreground leading-none">
          {bottomText}
        </div>
      </CardFooter>
    </Card>
  )
}

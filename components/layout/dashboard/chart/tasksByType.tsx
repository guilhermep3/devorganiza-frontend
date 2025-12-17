"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { formatPercentage } from "@/src/utils/calc"
import type { TasksByType } from "@/src/types/chart"

const chartConfig = {
  tarefas: {
    label: "tarefas",
    color: "var(--color-main-30)",
  },
} satisfies ChartConfig

const setorTypes = ["frontend", "backend", "ferramenta"] as const;
type SetorType = typeof setorTypes[number];

export function TasksByType({ data }: { data: TasksByType[] }) {

  const formatSetor = (type: SetorType) => {
    const map: Record<SetorType, string> = {
      frontend: "Front-end",
      backend: "Back-end",
      ferramenta: "Ferramenta",
    };

    return map[type];
  };

  const chartData = setorTypes.map((type) => {
    const item = data.find((i) => i.type === type)

    return {
      setor: formatSetor(type),
      tarefas: item?.tasks ? Number(item.tasks) : 0,
    }
  }).sort(
    (a, b) => b.tarefas - a.tarefas
  );

  const totalTasks = chartData.reduce(
    (acc, data) => acc + data.tarefas,
    0
  )

  const [first, second] = chartData;

  const firstPercentage = totalTasks > 0 ? (first.tarefas / totalTasks) * 100 : 0

  const secondPercentage = totalTasks > 0 ? (second.tarefas / totalTasks) * 100 : 0

  const difference = firstPercentage - secondPercentage;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Média de tarefas por setor</CardTitle>
        <CardDescription>Tarefas separadas por Front-end, Back-end e Ferramentas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="setor"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tarefas" fill="var(--color-main-30)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="chartFooter font-medium">
          <TrendingUp className="h-4 w-4 text-green-20" />
          <span className="font-bold">{first.setor}</span> concentra{" "}
          <span className="font-bold">
            {formatPercentage(firstPercentage)}%
          </span>{" "}
          de todas as tarefas
        </div>
        <div className="chartFooter text-gray-50">
          {first.setor} tem{" "}
          <span className="font-bold">
            {formatPercentage(difference)}%
          </span>{" "}
          a mais de tarefas que {second.setor}
        </div>
      </CardFooter>
    </Card>
  )
}

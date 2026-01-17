"use client";

import { AverageTimeFinish } from "@/src/types/chart";
import { useQuery } from "@tanstack/react-query";

export const useAverageTimeFinishTasksChart = () => {
  return useQuery<AverageTimeFinish[]>({
    queryKey: ["averageTimeFinishTasksChart"],
    queryFn: async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL!;
      const TOKEN = typeof window !== "undefined"
        ? document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1] : null;

      const res = await fetch(`${API_URL}/charts/average-time-finish-task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Erro ao buscar average-time-finish-task"
        );
      }

      return res.json();
    },
  });
};

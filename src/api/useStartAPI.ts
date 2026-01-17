import { useQuery } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useStartAPI() {

  return useQuery({
    queryKey: ['startAPI'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error(`Error: status ${res.status}`)
      }
      console.log("res", res)
      return res.json();
    },
    retry: 3,
    retryDelay: 3000,
    refetchOnWindowFocus: true
  })
}
import { useEffect, useState } from "react";

export function useStartAPI() {
  const [error, setError] = useState<any>();
  const [response, setResponse] = useState<number>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function startAPI() {
    try {
      const res = await fetch(`${API_URL}/`);
      setResponse(res.status);
    } catch (err) {
      setError({ error: "Erro ao iniciar a API", err })
    }
  }

  useEffect(() => {
    startAPI()
  }, [])

  return {
    response, error, startAPI
  }
}
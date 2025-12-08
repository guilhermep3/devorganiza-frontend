import { useEffect, useState } from "react";

export function useStartAPI() {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<number | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const startAPI = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/`, {
        signal: AbortSignal.timeout(10000)
      });

      setResponse(res.status);

      if (!res.ok) {
        throw new Error(`API respondeu com status: ${res.status}`);
      }

    } catch (err) {
      const error = err instanceof Error ? err : new Error("Erro desconhecido");
      setError(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startAPI();
  }, []);

  return {
    response, error, loading,
    startAPI
  };
}
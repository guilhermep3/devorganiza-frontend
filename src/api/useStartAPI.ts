"use client";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useStartAPI() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

  const startAPI = async () => {
    if (!API_URL) return;

    setLoading(true);

    const MAX_RETRIES = 3;
    const DELAY = 3000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(`${API_URL}/health`, {
          cache: "no-store"
        });
        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }

        setReady(true);
        setError(null);
        break;
      } catch (err) {
        if (attempt === MAX_RETRIES) {
          setError(
            err instanceof Error
              ? err
              : new Error("Falha ao iniciar API")
          );
        } else {
          await sleep(DELAY);
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    startAPI();
  }, []);

  return {
    loading, ready, error
  };
}
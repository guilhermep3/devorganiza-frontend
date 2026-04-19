"use client"

import { getToken, removeToken } from "../utils/token";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = Omit<RequestInit, "credentials">;

export async function apiFetch(path: string, options: FetchOptions = {}) {
  let token = null;

  if (typeof window !== "undefined") {
    token = getToken();
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) {
      removeToken();

      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }
    throw new Error(data?.error ?? "Erro na requisição");
  }

  return data;
}
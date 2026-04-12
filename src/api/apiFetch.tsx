const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = Omit<RequestInit, "credentials">;

export async function apiFetch(path: string, options: FetchOptions = {}) {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
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
    throw new Error(data?.error ?? "Erro na requisição");
  }

  return data;
}
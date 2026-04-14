"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken } from "@/src/utils/token";

export default function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
      router.replace("/dashboard");
    }

  }, [searchParams, router]);

  return null;
}
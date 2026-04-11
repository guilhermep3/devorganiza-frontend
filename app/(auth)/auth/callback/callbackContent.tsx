"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createCookie } from "@/src/utils/createCookie";

export default function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      document.cookie = createCookie(token);
      router.replace("/dashboard");
    }

  }, [searchParams, router]);

  return null;
}
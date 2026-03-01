"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${86400 * 3}`; // 3 days
      router.replace("/dashboard");
    } else {
      router.replace("/signin");
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <p>Carregando...</p>
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    </div>
  );
}
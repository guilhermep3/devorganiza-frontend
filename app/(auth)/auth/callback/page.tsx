"use client";
import { Suspense } from "react";
import CallbackContent from "./callbackContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Autenticando...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
"use client";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/passwordInput";
import { useSignin } from "@/src/api/useSignin";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit, isPending, error, errors, clearErrors } = useSignin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">Faça login</h1>
      <h2 className="text-sm text-center">Preencha o formulário abaixo</h2>
      <form className="my-10 space-y-4"
        onSubmit={(e) => handleSubmit(e, { email, password })}
      >
        <div className="flex flex-col gap-0">
          <input type="email"
            className="inputCustom text-base"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrors("email");
            }}
          />
          {errors.email && (
            <p className="errorMsg">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <PasswordInput value={password}
            onChange={(e) => {
              setPassword(e);
              clearErrors("password");
            }}
          />
          {errors.password && (
            <p className="errorMsg">{errors.password}</p>
          )}
        </div>
        {errors.submit && (
          <p className="errorMsg">{errors.submit}</p>
        )}
        {error && <p className="errorMsg">{error.message}</p>}
        <Button submit className={`w-full ${isPending ? 'pointer-events-none opacity-75' : ''}`}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <p className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link
          href={`/signup`}
          className="text-main-60 font-semibold hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}

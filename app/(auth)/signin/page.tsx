"use client";
import { Button } from "@/components/button";
import { DividerOu } from "@/components/dividerOu";
import { GoogleOauthButton } from "@/components/googleOauthButton";
import { PasswordInput } from "@/components/passwordInput";
import { useSignin } from "@/src/api/useSignin";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit, isPending, error, errors, clearErrors } = useSignin();

  return (
    <div className="w-full max-w-80">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">Faça login</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Entre com sua conta para continuar
        </p>
      </div>
      <div>
        <GoogleOauthButton />
        <DividerOu />
      </div>
      <form className="mt-2 space-y-4 w-full"
        onSubmit={(e) => handleSubmit(e, { email, password })}
      >
        <div className="labelInputDivStyle">
          <label className="text-sm font-medium">
            Email
          </label>
          <input type="email"
            className="inputCustom text-base"
            placeholder="seuemail@email.com"
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
        <div className="labelInputDivStyle">
          <label className="text-sm font-medium">
            Senha
          </label>
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
        <Button submit
          className={`w-full ${isPending ? 'pointer-events-none opacity-75' : ''}`}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <p className="text-center text-sm mt-6">
        Não tem uma conta?{" "}
        <Link
          href={`/signup`}
          className="text-main-60 font-semibold hover:underline ml-1"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}

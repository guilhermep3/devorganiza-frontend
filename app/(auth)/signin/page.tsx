"use client";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/passwordInput";
import { useSignin } from "@/src/api/useSignin";
import { errorSubmitStyle } from "@/src/styles";
import Link from "next/link";

export default function Page() {
  const {
    email, setEmail, password, setPassword,
    errors, loading, handleSubmit
  } = useSignin();

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center mb-2">Faça login</h1>
      <h2 className="text-sm text-center">Preencha o formulário abaixo</h2>

      <form onSubmit={handleSubmit} className="my-10 space-y-5">
        <div className="flex flex-col gap-0">
          <input
            type="email"
            className="inputCustom text-base"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className={errorSubmitStyle}>{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <PasswordInput value={password} onChange={setPassword} />
          {errors.password && (
            <p className={errorSubmitStyle}>{errors.password}</p>
          )}
        </div>

        {errors.submit && (
          <p className={errorSubmitStyle}>{errors.submit}</p>
        )}

        <Button submit className={`w-full ${loading ? 'pointer-events-none opacity-75' : ''}`}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="text-center">
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

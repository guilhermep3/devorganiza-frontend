"use client";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/passwordInput";
import { useSignup } from "@/src/api/useSignup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const {
    name, setName, username, setUsername,
    email, setEmail, password, setPassword,
    errors, loading, handleSubmit,
  } = useSignup();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      router.push('/dashboard')
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">Crie sua conta</h1>
      <h2 className="text-sm text-center">Preencha o formulário abaixo</h2>
      <form onSubmit={handleSubmit} className="my-10 space-y-5">
        <div className="flex flex-col gap-0">
          <input
            type="text"
            className="inputCustom text-base"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="errorSubmit">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <input
            type="text"
            className="inputCustom text-base"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="errorSubmit">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <input
            type="email"
            className="inputCustom text-base"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="errorSubmit">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <PasswordInput value={password} onChange={setPassword} />
          {errors.password && (
            <p className="errorSubmit">{errors.password}</p>
          )}
        </div>
        {errors.submit && (
          <p className="text-sm text-red-600 text-center">{errors.submit}</p>
        )}
        <Button submit className={`w-full ${loading ? 'pointer-events-none opacity-75' : ''}`}>
          {loading ? "Criando..." : "Criar Conta"}
        </Button>
      </form>
      <p className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link
          href={`/signin`}
          className="text-main-60 font-semibold hover:underline"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
}

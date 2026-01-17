"use client";
import { Button } from "@/components/button";
import { PasswordInput } from "@/components/passwordInput";
import { useSignup } from "@/src/api/useSignup";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit, isPending, error, errors, clearErrors } = useSignup();

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-2">Crie sua conta</h1>
      <h2 className="text-sm text-center">Preencha o formulário abaixo</h2>
      <form className="my-10 space-y-4"
        onSubmit={(e) => handleSubmit(e, { name, username, email, password })}
      >
        <div className="flex flex-col gap-0">
          <input
            type="text"
            className="inputCustom text-base"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearErrors("name");
            }}
          />
          {errors.name && (
            <p className="errorMsg">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <input
            type="text"
            className="inputCustom text-base"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearErrors("username");
            }}
          />
          {errors.username && (
            <p className="errorMsg">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-0">
          <input
            type="email"
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
          <p className="text-sm text-red-600 text-center">{errors.submit}</p>
        )}
        <Button submit className={`w-full ${isPending ? 'pointer-events-none opacity-75' : ''}`}>
          {isPending ? "Criando..." : "Criar Conta"}
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

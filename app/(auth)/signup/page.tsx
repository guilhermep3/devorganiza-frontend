"use client";
import { Button } from "@/components/button";
import { DividerOu } from "@/components/dividerOu";
import { GoogleOauthButton } from "@/components/googleOauthButton";
import { Logo } from "@/components/logo";
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
    <div className="w-full max-w-80">
      <div className="flex justify-center items-center my-5">
        <Logo width={64} />
      </div>
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Preencha os campos abaixo para criar sua conta
        </p>
      </div>
      <div>
        <GoogleOauthButton />
        <DividerOu />
      </div>
      <form className="mt-2 space-y-4 w-full"
        onSubmit={(e) => handleSubmit(e, { name, username, email, password })}
      >
        <div className="ds-field-form-group">
          <label className="text-sm font-medium">
            Nome
          </label>
          <input
            type="text"
            className="ds-input text-base"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearErrors("name");
            }}
          />
          {errors.name && (
            <p className="ds-message-error">{errors.name}</p>
          )}
        </div>
        <div className="ds-field-form-group">
          <label className="text-sm font-medium">
            Nome de usuário
          </label>
          <input
            type="text"
            className="ds-input text-base"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearErrors("username");
            }}
          />
          {errors.username && (
            <p className="ds-message-error">{errors.username}</p>
          )}
        </div>
        <div className="ds-field-form-group">
          <label className="text-sm font-medium">
            Email
          </label>
          <input type="email"
            className="ds-input text-base"
            placeholder="seuemail@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrors("email");
            }}
          />
          {errors.email && (
            <p className="ds-message-error">{errors.email}</p>
          )}
        </div>
        <div className="ds-field-form-group">
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
            <p className="ds-message-error">{errors.password}</p>
          )}
        </div>
        {errors.submit && (
          <p className="text-sm text-red-600 text-center">{errors.submit}</p>
        )}
        <Button submit className={`w-full ${isPending ? 'pointer-events-none opacity-75' : ''}`}>
          {isPending ? "Criando..." : "Criar Conta"}
        </Button>
      </form>
      <p className="text-center text-sm mt-6">
        Já tem uma conta?{" "}
        <Link
          href={`/signin`}
          className="text-main-60 font-semibold hover:underline ml-1"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
}

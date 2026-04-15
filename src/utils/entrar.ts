import { redirect } from "next/navigation";
import { getToken } from "./token";

export function handleEntrar() {
  const token = getToken();

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  }
}
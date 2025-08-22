"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "../components/componentInput";

export function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const validUser = "pastorFelix";
  const validPass = "senha.123";

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = formData.get("userLogin");
    const pass = formData.get("senhaLogin");
    console.log(user, "\n",pass);
    if (user == "" || pass == ""){
      setError("Usuário ou senha sem preenchimento.");
    }
    if (user == validUser && pass == validPass) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/table");
    } else {
      setError("Usuário ou senha inválidos.");
    }
  }

  return (
    <main className="text-[#350700] lg:w-100 md:w-100 sm:w-2xs container mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-2">LOGIN</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados de login para acessar.</p>
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        <FormInput id="userLogin" name="userLogin" label="Usuário:" placeholder="Digite o nome de usuário" type="text" required/>
        <FormInput id="senhaLogin" name="senhaLogin" label="Senha:" placeholder="Digite sua senha" type="password" required/>
        {error && <p className="m-0 p-0 text-red-500 text-sm w-full text-center">{error}</p>}
        <Button id="btn-login" className="w-full m-0 p-0 flex justify-center" type="submit">ENTRAR</Button>
      </form>
    </main>
  );
}
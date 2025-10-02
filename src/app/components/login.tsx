"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "../components/componentInput";

export function Login() {
  const router = useRouter();
  const domButton = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState("");
  const [logged, setLogged] = useState("");

  const validUser = "pastorFelix";
  const validPass = "senha.123";

  function buttonDisable() {  
    if (domButton.current) {
      domButton.current.disabled = true;
      setLogged("Login feito com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/table");
      }, 2000);
    }
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = formData.get("userLogin");
    const pass = formData.get("senhaLogin");

    if (user == "" || pass == ""){
      return setError("Usuário ou senha sem preenchimento.");
    }
    if (user == validUser && pass == validPass) {
      localStorage.setItem("isLoggedIn", "true");
      return buttonDisable();
    } else {
      return setError("Usuário ou senha inválidos.");
    }
  }

  return (
    <main className="text-[#350700] container max-w-md mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-2">LOGIN</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados de login para acessar.</p>
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        
        <FormInput id="userLogin" name="userLogin" label="Usuário:" placeholder="Digite o nome de usuário" type="text" required/>
        <FormInput id="senhaLogin" name="senhaLogin" label="Senha:" placeholder="Digite sua senha" type="password" required/>
        
        {error && <p className="m-0 p-0 text-red-500 text-sm w-full text-center">{error}</p>}
        {logged && <p className="m-0 p-0 text-green-500 text-sm w-full text-center">{logged}</p>}

        <Button id="btn-login" ref={domButton} className="w-full m-0 p-0 flex justify-center" type="submit">ENTRAR</Button>
      </form>
    </main>
  );
}
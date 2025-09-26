"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "../components/componentInput";

export function Login() {
  const router = useRouter();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // A lógica de autenticação foi removida.
    // O formulário agora apenas redireciona para a página da tabela para manter o fluxo.
    router.push("/table");
  }

  return (
    <main className="text-[#350700] container max-w-md mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-2">LOGIN</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados de login para acessar.</p>
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        <FormInput id="userLogin" name="userLogin" label="Usuário:" placeholder="Digite o nome de usuário" type="text" required/>
        <FormInput id="senhaLogin" name="senhaLogin" label="Senha:" placeholder="Digite sua senha" type="password" required/>
        <Button id="btn-login" className="w-full m-0 p-0 flex justify-center" type="submit">ENTRAR</Button>
      </form>
    </main>
  );
}
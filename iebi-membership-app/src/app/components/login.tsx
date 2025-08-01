import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";

export function Login() {
  return (
    <section className="w-100 container mx-auto my-10 px-5 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-2">LOGIN</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados de login para acessar.</p>
      <form className="flex flex-col gap-6">

        <FormInput id="userLogin" label="Usuário:" placeholder="Digite o nome de usuário" type="text" required/>
        <FormInput id="senhaLogin" label="Senha:" placeholder="Digite sua senha" type="password" required/>
        
        <div className="m-0 p-0 flex justify-center">
          <Button id="btn-login" className="w-full" type="submit">ENTRAR</Button>
        </div>
      </form>
    </section>
  );
}
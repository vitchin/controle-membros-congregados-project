import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const inputstyle = "form-group mb-6 w-full flex flex-col align-start justify-center";

export function Login() {
  return (
    <section className="w-100 container mx-auto my-10 px-5 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-2">LOGIN</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados de login para acessar.</p>
      <form>
        <div className={inputstyle}>
          <Label>Usuário:</Label>
          <Input type="text" id="username" name="username" required />
        </div>
        <div className={inputstyle}>
          <Label>Senha:</Label>
          <Input type="password" id="password" name="password" required />
        </div>
        <div className="flex justify-center">
          <Button className="w-full h-10" type="submit">ENTRAR</Button>
        </div>
      </form>
    </section>
  );
}
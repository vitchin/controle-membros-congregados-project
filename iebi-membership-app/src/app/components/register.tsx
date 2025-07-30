import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const inputstyle = "mb-6 w-full h-fit grid grid-cols-4 gap-4 items-center justify-center";

export function Register() {
  return (
    <section className="lg:w-400 md:w-300 sm:w-100 container mx-auto my-10 px-5 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">REGISTRAR</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados pessoais, familiares e ministeriais para completar o registro.</p>
      <form>
        <h3 className="mb-2 font-semibold">DADOS PESSOAIS</h3>
        <div className={inputstyle}>
          <Input placeholder="Nome" required />
          <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sexo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                </SelectContent>
            </Select>
          <Input type="date" placeholder="Data de Nascimento" required />
          <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Estado civil" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="solteiro">Solteiro</SelectItem>
                    <SelectItem value="casado">Casado</SelectItem>
                    <SelectItem value="divorciado">Divorciado</SelectItem>
                </SelectContent>
            </Select>
          <Input placeholder="(xx) xxxxx-xxxx" required />
          <Input placeholder="exemplo@gmail.com" required />
          <Input placeholder="CEP" required />
          <Input placeholder="Endereço" required />
          <Input placeholder="Cidade" required />
          <Input placeholder="Bairro" required />
          <Input placeholder="UF" required />
          <Input placeholder="Naturalidade" required />
          <Input placeholder="Conhecido por..." required />
          <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolaridade" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="fundamental">Fundamental</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="superior">Superior</SelectItem>
            </SelectContent>
        </Select>
          <Input placeholder="(xx) xxxxx-xxxx" required />
          <Input placeholder="Onde trabalha?" required />
        </div>

        <h3 className="mb-2 font-semibold">DADOS FAMILIARES</h3>
        <div className={inputstyle}>
          <Input placeholder="Nome do cônjuge" />
          <Input placeholder="(xx) xxxxx-xxxx" />
          <Input type="date" placeholder="Data do casamento" />
          <Input placeholder="Nome do pai" />
          <Input placeholder="Nome da mãe" />
          <Input type="number" maxLength={1} placeholder="N° de Filhos" />
        </div>

        <h3 className="mb-2 font-semibold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <Input placeholder="Ministério que faz parte" />
          <Input placeholder="Função que exerce" />
          <div className="flex justify-start items-center mb-2">
              <Checkbox className="m-0 mr-2 w-6 h-6"></Checkbox><p>Lider de GFCD?</p>
          </div>
          <Input type="date" placeholder="Data da conversão" />
          <div className="flex justify-start items-center mb-2">
              <Checkbox className="m-0 mr-2 w-6 h-6"></Checkbox><p>Batizado?</p>
          </div>
          <Input placeholder="Igreja do batismo" />
          <Input type="date" placeholder="Data do batismo" />
          <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de admissão" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="fundamental">Batismo</SelectItem>
                <SelectItem value="medio">Aclamação</SelectItem>
                <SelectItem value="superior">Transferência</SelectItem>
            </SelectContent>
        </Select>
          <Input type="date" placeholder="Data da admissão" />
        </div>

        <h3 className="mb-2 font-semibold">DADOS ADICIONAIS</h3>
        <div className={inputstyle}>
            <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="GFCD que frequenta?" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">REUEL</SelectItem>
                <SelectItem value="2">DEUS É FIEL</SelectItem>
            </SelectContent>
        </Select>
        <div className="flex justify-start items-center mb-2">
              <Checkbox className="m-0 mr-2 w-6 h-6"></Checkbox><p>Já foi consolidado?</p>
        </div>
        <Input placeholder="Nome do consolidador" />
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Já fez Retiro?" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">Pre-encontro</SelectItem>
                <SelectItem value="2">Encontro</SelectItem>
                <SelectItem value="3">Pós-encontro</SelectItem>
            </SelectContent>
        </Select>
        </div>

        <div className="flex justify-center">
          <Button className="w-full h-10" type="submit">REGISTRAR</Button>
        </div>
      </form>
    </section>
  );
}
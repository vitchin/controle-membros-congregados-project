import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";
import { FormSelect } from "./componentSelect";
import { FormCheckbox } from "./componentCheckbox";

const inputstyle = "mb-6 w-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-start";

export function Register() {
  return (
    <section className="container max-w-screen-lg mx-auto my-10 px-5 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">REGISTRAR</h2>
      <p className="mb-4 text-center text-gray-500">Informe seus dados pessoais, familiares e ministeriais para completar o registro.</p>
      <form>
        <h3 className="mb-2 font-bold">DADOS PESSOAIS</h3>
        <div className={inputstyle}>
          <FormInput label="Nome:" placeholder="Digite seu nome completo" required />
          <FormSelect label="Sexo:" placeholder="Sexo" required options={[
              { label: "Masculino", value: "1" },
              { label: "Feminino", value: "2" }
          ]} />
          <FormInput label="Data de Nascimento:" placeholder="" type="date" required />
          <FormSelect label="Estado Civil:" placeholder="Estado Civil" required options={[
              { label: "Solteiro", value: "1" },
              { label: "Casado", value: "2" },
              { label: "Divorcido", value: "3"}
          ]} />
          <FormInput label="Telefone:" placeholder="(xx) xxxxx-xxxx" required />
          <FormInput label="Email:" placeholder="Email" type="email" required />
          <FormInput label="CEP" placeholder="xxxxx-xxx" required />
          <FormInput label="Endereço:" placeholder="Endereço" required />
          <FormInput label="Cidade:" placeholder="Cidade" required />
          <FormInput label="Complemento:" placeholder="Complemento" />
          <FormInput label="Bairro:" placeholder="Bairro" required />
          <FormInput label="UF:" placeholder="UF" disabled/>
          <FormInput label="Naturalidade:" placeholder="Naturalidade" />
          <FormInput label="Conhecido por:" placeholder="Apelido" />
          <FormSelect label="Escolaridade:" placeholder="Escolaridade" options={[
              { label: "Fundamental", value: "1" },
              { label: "Médio", value: "2" },
              { label: "Superior", value: "3"}
          ]} />
          <FormInput label="Telefone do trabalho:" placeholder="(xx) xxxxx-xxxx" />
          <FormInput label="Local de trabalho:" placeholder="Empresa" />
        </div>

        <h3 className="mb-2 font-bold">DADOS FAMILIARES</h3>
        <div className={inputstyle}>
          <FormInput label="Nome do Cônjuge:" placeholder="Nome do Cônjuge" type="text" disabled/>
          <FormInput label="Telefone do Cônjuge:" placeholder="(xx) xxxxx-xxxx" disabled />
          <FormInput label="Data do Casamento:" placeholder="" type="date" disabled />
          <FormInput label="Nome do Pai:" placeholder="Nome do Pai" type="text" />
          <FormInput label="Nome da Mãe:" placeholder="Nome da Mãe" type="text" />
          <FormInput label="Nº de Filhos:" placeholder="Nº de filhos" type="number" maxLength={1}/>
        </div>

        <h3 className="mb-2 font-bold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <FormInput label="Ministério que faz parte:" placeholder="Ministério que faz parte" type="text" />
          <FormInput label="Função que exerce" placeholder="Função que exerce" type="text" />
          <FormCheckbox id="gfcdLider" label="Lider de GFCD?" />
          <FormInput label="Data da Conversão:" placeholder="" type="date" required/>
          <FormCheckbox id="seBatizado" label="Batizado?" />
          <FormInput label="Igreja do Batismo" placeholder="Igreja do Batismo" type="text" disabled />
          <FormInput label="Data do Batismo" placeholder="" type="date" disabled/>
          <FormSelect label="Tipo de Admissão:" placeholder="Tipo de Admissão" options={[
              { label: "Batismo", value: "1" },
              { label: "Aclamação", value: "2" },
              { label: "Transferência", value: "3"}
          ]} />
          <FormInput label="Data da Admissão:" placeholder="" type="date" disabled/>
        </div>

        <h3 className="mb-2 font-bold">DADOS ADICIONAIS</h3>
        <div className={inputstyle}>
          <FormSelect label="Escolaridade:" placeholder="Escolaridade" options={[
              {label: "Fundamental", value: "1" },
              {label: "Médio", value: "2" },
              {label: "Superior", value: "3"}
          ]} />
          <FormSelect label="GFCD que frequenta:" placeholder="GFCD que frequenta" options={[ 
              { label: "CELULA", value: "1" },
              { label: "CELULA", value: "2" },
              { label: "CELULA", value: "3" },
              { label: "CELULA", value: "4" },
              { label: "CELULA", value: "5" },
              { label: "CELULA", value: "6" },              
          ]} />
          <FormCheckbox id="gfcdConsolidado" label="Já foi consolidado?" />
          <FormInput label="Nome do Consolidador:" placeholder="Nome do Consolidador" type="text"/>
          <FormSelect label="Já fez retiro?" placeholder="Já fez retiro?" options={[
              { label: "Pre-encontro", value: "1" },
              { label: "Encontro", value: "2"},
              { label: "Pós-encontro", value: "3"}
          ]} />
        </div>

        <div className="flex justify-center">
          <Button id="btn-register" className="w-full" type="submit">REGISTRAR</Button>
        </div>
      </form>
    </section>
  );
}
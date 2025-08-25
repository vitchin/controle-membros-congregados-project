"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";
import { FormSelect } from "./componentSelect";
import { FormCheckbox } from "./componentCheckbox";

const inputstyle = "mb-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

type FormData = {
  nome: string; sexo: string; dtNascimento: string; estadoCivil: string; numTel: string; email: string; cep: string;
  endereco: string; cidade: string; bairro: string; uf: string; natural: string; apelido: string; escola: string;
  empresaTel: string; empresaLocal: string; conjuge: string; conjugeTel: string; dtCasamento: string;
  pai: string; mae: string; numFilhos: number | ""; ministerio: string; ministerioFunc: string;
  gfcdLider: boolean; dtBatismo: string; batizado: boolean; igrejaBatizado: string;
  dtAdmissao: string; tipoAdmissao: string; dtConversao: string; gfcdFrequentado: string;
  gfcdConsolidado: boolean; nomeConsolidador: string; retiro: string; profissao: string; complemento: string;
};

const initialFormData: FormData = {
  nome: "", sexo: "", dtNascimento: "", estadoCivil: "", numTel: "", email: "", cep: "",
  endereco: "", cidade: "", bairro: "", uf: "", natural: "", apelido: "", escola: "",
  empresaTel: "", empresaLocal: "", conjuge: "", conjugeTel: "", dtCasamento: "",
  pai: "", mae: "", numFilhos: "", ministerio: "", ministerioFunc: "",
  gfcdLider: false, dtBatismo: "", batizado: false, igrejaBatizado: "",
  dtAdmissao: "", tipoAdmissao: "", dtConversao: "", gfcdFrequentado: "",
  gfcdConsolidado: false, nomeConsolidador: "", retiro: "", profissao: "", complemento: ""
};

type ViaCepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cepError, setCepError] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");

    const personToEditData = localStorage.getItem("personToEdit");
    if (personToEditData) {
      try {
        const personToEdit: Partial<FormData> = JSON.parse(personToEditData);
        setFormData({ ...initialFormData, ...personToEdit });
        setOriginalName(personToEdit.nome || "");
        setIsEditMode(true);
        localStorage.removeItem("personToEdit");
      } catch (error) {
        console.error("Failed to parse personToEdit data from localStorage", error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target as HTMLInputElement & { id: keyof FormData };
    setFormData((prev) => ({ ...prev, [id]: type === 'number' ? (value === '' ? '' : Number(value)) : value }));
  };

  const handleSelectChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      setCepError("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    setCepError("");

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setFormData(prev => ({
          ...prev,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCepError("Erro ao buscar CEP. Verifique sua conexão.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPeople = localStorage.getItem("people");
    let people: FormData[] = storedPeople ? JSON.parse(storedPeople) : [];

    if (isEditMode) {
      people = people.map((p) =>
        p.nome === originalName ? formData : p
      );
    } else {
      people.push(formData);
    }

    localStorage.setItem("people", JSON.stringify(people));
    router.push("/table");
  };

  const estadosBrasil = [
    { label: "Acre (AC)", value: "AC" }, { label: "Alagoas (AL)", value: "AL" },
    { label: "Amapá (AP)", value: "AP" }, { label: "Amazonas (AM)", value: "AM" },
    { label: "Bahia (BA)", value: "BA" }, { label: "Ceará (CE)", value: "CE" },
    { label: "Distrito Federal (DF)", value: "DF" }, { label: "Espírito Santo (ES)", value: "ES" },
    { label: "Goiás (GO)", value: "GO" }, { label: "Maranhão (MA)", value: "MA" },
    { label: "Mato Grosso (MT)", value: "MT" }, { label: "Mato Grosso do Sul (MS)", value: "MS" },
    { label: "Minas Gerais (MG)", value: "MG" }, { label: "Pará (PA)", value: "PA" },
    { label: "Paraíba (PB)", value: "PB" }, { label: "Paraná (PR)", value: "PR" },
    { label: "Pernambuco (PE)", value: "PE" }, { label: "Piauí (PI)", value: "PI" },
    { label: "Rio de Janeiro (RJ)", value: "RJ" }, { label: "Rio Grande do Norte (RN)", value: "RN" },
    { label: "Rio Grande do Sul (RS)", value: "RS" }, { label: "Rondônia (RO)", value: "RO" },
    { label: "Roraima (RR)", value: "RR" }, { label: "Santa Catarina (SC)", value: "SC" },
    { label: "São Paulo (SP)", value: "SP" }, { label: "Sergipe (SE)", value: "SE" },
    { label: "Tocantins (TO)", value: "TO" }
  ];

  return (
    <section className="text-[#350700] container w-full h-full mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">
        {isEditMode ? "EDITAR REGISTRO" : "REGISTRAR"}
      </h2>
      <p className="mb-5 text-center text-gray-500">
        Informe seus dados pessoais, familiares e ministeriais para completar o registro.
      </p>
      
      <form className="w-full" onSubmit={handleSubmit}>
        <h3 className="mb-5 font-bold">DADOS PESSOAIS</h3>
        <div className={inputstyle}>
          <FormInput id="nome" label="Nome:" placeholder="Nome completo" required value={formData.nome} onChange={handleInputChange} disabled={isEditMode} />
          <FormInput id="apelido" label="Nome social:" placeholder="Nome social" type="text" value={formData.apelido} onChange={handleInputChange} />
          <FormSelect id="sexo" label="Sexo:" placeholder="Sexo" required value={formData.sexo} onChange={(value) => handleSelectChange('sexo', value)} options={[
            { label: "Masculino", value: "Masculino" }, { label: "Feminino", value: "Feminino" }
          ]} />
          <FormInput id="dtNascimento" label="Data de Nascimento:" placeholder="" type="date" required value={formData.dtNascimento} onChange={handleInputChange} />
          <FormInput id="natural" label="Naturalidade:" placeholder="Naturalidade" type="text" value={formData.natural} onChange={handleInputChange} />
          <FormInput id="profissao" label="Profissão:" placeholder="Profissão" type="text" value={formData.profissao} onChange={handleInputChange} />
          <FormSelect id="escola" label="Escolaridade:" placeholder="Escolaridade" value={formData.escola} onChange={(value) => handleSelectChange('escola', value)} options={[
            { label: "Fundamental", value: "Fundamental" }, { label: "Médio", value: "Médio" }, { label: "Superior", value: "Superior"}
          ]} />
          <FormSelect id="estadoCivil" label="Estado Civil:" placeholder="Estado Civil" required value={formData.estadoCivil} onChange={(value) => handleSelectChange('estadoCivil', value)} options={[
            { label: "Solteiro", value: "Solteiro" }, { label: "Casado", value: "Casado" }, { label: "Divorciado", value: "Divorciado"}
          ]} />
          <FormInput id="numTel" label="Telefone:" placeholder="(xx) xxxxx-xxxx" type="text" required value={formData.numTel} onChange={handleInputChange} />
          <FormInput id="email" label="Email:" placeholder="Email" type="email" required value={formData.email} onChange={handleInputChange} />
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">ENDEREÇO</h4>
        <div className={inputstyle}>
          <div>
            <FormInput id="cep" label="CEP:" placeholder="xxxxx-xxx" type="text" required value={formData.cep} onChange={handleInputChange} onBlur={handleCepBlur} />
            {cepError && <p className="text-red-500 text-xs mt-1">{cepError}</p>}
          </div>
          <FormInput id="endereco" label="Endereço:" placeholder="Endereço" type="text" required value={formData.endereco} onChange={handleInputChange} />
          <FormInput id="complemento" label="Complemento:" placeholder="Complemento" type="text" value={formData.complemento} onChange={handleInputChange} />
          <FormInput id="bairro" label="Bairro:" placeholder="Bairro" type="text" required value={formData.bairro} onChange={handleInputChange} />
          <FormInput id="cidade" label="Cidade:" placeholder="Cidade" type="text" required value={formData.cidade} onChange={handleInputChange} />
          <FormSelect id="uf" placeholder="UF" label="UF:" value={formData.uf} onChange={(value) => handleSelectChange('uf', value)} options={estadosBrasil}/>
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">TRABALHO</h4>
        <div className={inputstyle}>
          <FormInput id="empresaLocal" label="Local de Trabalho:" placeholder="Local de Trabalho" type="text" value={formData.empresaLocal} onChange={handleInputChange}/>
          <FormInput id="empresaTel" label="Telefone da Empresa:" placeholder="(xx) xxxxx-xxxx" type="text" value={formData.empresaTel} onChange={handleInputChange} />
        </div>

        <h3 className="my-5 font-bold">DADOS FAMILIARES</h3>
        <div className={inputstyle}>
          <FormInput id="pai" label="Nome do Pai:" placeholder="Nome do Pai" type="text" value={formData.pai} onChange={handleInputChange}/>
          <FormInput id="mae" label="Nome da Mãe:" placeholder="Nome da Mãe" type="text" value={formData.mae} onChange={handleInputChange} />
          <FormInput id="numFilhos" label="Nº de Filhos:" placeholder="Nº de filhos" type="number" value={String(formData.numFilhos)} onChange={handleInputChange}/>
          <FormInput id="conjuge" label="Nome do Cônjuge:" placeholder="Nome do Cônjuge" type="text" value={formData.conjuge} onChange={handleInputChange} disabled={formData.estadoCivil !== 'Casado'}/>
          <FormInput id="conjugeTel" label="Telefone do Cônjuge:" placeholder="(xx) xxxxx-xxxx" value={formData.conjugeTel} onChange={handleInputChange} disabled={formData.estadoCivil !== 'Casado'} />
          <FormInput id="dtCasamento" label="Data do Casamento:" placeholder="" type="date" value={formData.dtCasamento} onChange={handleInputChange} disabled={formData.estadoCivil !== 'Casado'} />
        </div>

        <h3 className="my-5 font-bold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <FormInput id="ministerio" label="Ministério que faz parte:" placeholder="Ministério que faz parte" type="text" value={formData.ministerio} onChange={handleInputChange} />
          <FormInput id="ministerioFunc" label="Função que exerce:" placeholder="Função que exerce" type="text" value={formData.ministerioFunc} onChange={handleInputChange} />
          <FormCheckbox id="gfcdLider" label="Lider de GFCD?" checked={formData.gfcdLider} onCheckedChange={(checked) => handleCheckboxChange('gfcdLider', checked)} />
          <FormInput id="dtConversao" label="Data da Conversão:" placeholder="" type="date" required value={formData.dtConversao} onChange={handleInputChange}/>
          <FormCheckbox id="batizado" label="Batizado?" checked={formData.batizado} onCheckedChange={(checked) => handleCheckboxChange('batizado', checked)} />
          <FormInput id="igrejaBatizado" label="Igreja do Batismo" placeholder="Igreja do Batismo" type="text" value={formData.igrejaBatizado} onChange={handleInputChange} disabled={!formData.batizado} />
          <FormInput id="dtBatismo" label="Data do Batismo" placeholder="" type="date" value={formData.dtBatismo} onChange={handleInputChange} disabled={!formData.batizado}/>
          <FormSelect id="tipoAdmissao" label="Tipo de Admissão:" placeholder="Tipo de Admissão" value={formData.tipoAdmissao} onChange={(value) => handleSelectChange('tipoAdmissao', value)} options={[
            { label: "Batismo", value: "Batismo" }, { label: "Vindo de outra igreja", value: "Vindo de outra igreja" }, { label: "Carta de transferência", value: "Carta de transferência"}
          ]} />
          <FormInput id="dtAdmissao" label="Data da Admissão:" placeholder="" type="date" value={formData.dtAdmissao} onChange={handleInputChange}/>
        </div>

        <h3 className="my-5 font-bold">DADOS ADICIONAIS</h3>
        <div className={inputstyle}>
          <FormSelect id="gfcdFrequentado" label="GFCD que frequenta:" placeholder="GFCD que frequenta" value={formData.gfcdFrequentado} onChange={(value) => handleSelectChange('gfcdFrequentado', value)} options={[
            { label: "CELULA", value: "CELULA 1" }, { label: "CELULA", value: "CELULA 2" },
            { label: "CELULA", value: "CELULA 3" }, { label: "CELULA", value: "CELULA 4" },
            { label: "CELULA", value: "CELULA 5" }, { label: "CELULA", value: "CELULA 6" },
          ]} />
          <FormCheckbox id="gfcdConsolidado" label="Já foi consolidado?" checked={formData.gfcdConsolidado} onCheckedChange={(checked) => handleCheckboxChange('gfcdConsolidado', checked)}/>
          <FormInput id="nomeConsolidador" label="Nome do Consolidador:" placeholder="Nome do Consolidador" type="text" value={formData.nomeConsolidador} onChange={handleInputChange} disabled={!formData.gfcdConsolidado}/>
          <FormSelect id="retiro" label="Já fez retiro?" placeholder="Já fez retiro?" value={formData.retiro} onChange={(value) => handleSelectChange('retiro', value)} options={[
            { label: "Pre-encontro", value: "Pre-encontro" }, { label: "Encontro", value: "Encontro"}, { label: "Pós-encontro", value: "Pós-encontro"}
          ]} />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isLoggedIn && (
            <Button id="btn-back" variant="outline" onClick={() => router.push('/table')}>
              VOLTAR PARA A TABELA
            </Button>
          )}
          <Button id="btn-register" className="w-full" type="submit">
            {isEditMode ? "CONFIRMAR" : "REGISTRAR"}
          </Button>
        </div>
      </form>
    </section>
  );
}
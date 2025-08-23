"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";
import { FormSelect } from "./componentSelect";
import { FormCheckbox } from "./componentCheckbox";

const inputstyle = "mb-6 w-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

const initialFormData = {
  nome: "", sexo: "", dtNascimento: "", estadoCivil: "", numTel: "", email: "", cep: "",
  endereco: "", cidade: "", bairro: "", uf: "", natural: "", apelido: "", escola: "",
  empresaTel: "", empresaLocal: "", conjuge: "", conjugeTel: "", dtCasamento: "",
  pai: "", mae: "", numFilhos: 0, ministerio: "", ministerioFunc: "",
  gfcdLider: false, dtBatismo: "", batizado: false, igrejaBatizado: "",
  dtAdmissao: "", tipoAdmissao: "", dtConversao: "", gfcdFrequentado: "",
  gfcdConsolidado: false, nomeConsolidador: "", retiro: "",
};

export function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");

    const personToEditData = localStorage.getItem("personToEdit");
    if (personToEditData) {
      const personToEdit = JSON.parse(personToEditData);
      setFormData(personToEdit);
      setIsEditMode(true);
      localStorage.removeItem("personToEdit");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    // @ts-ignore
    const checked = e.target.checked;
    setFormData((prev) => ({ ...prev, [id]: isCheckbox ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPeople = localStorage.getItem("people");
    let people = storedPeople ? JSON.parse(storedPeople) : [];

    if (isEditMode) {
      people = people.map((p: any) =>
        p.nome === formData.nome ? formData : p
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
          <FormInput id="nome" label="Nome:" placeholder="Nome completo" required value={formData.nome} onChange={handleChange} />
          <FormInput id="apelido" label="Nome social:" placeholder="Nome social" type="text" value={formData.apelido} onChange={handleChange} />
          <FormSelect id="sexo" label="Sexo:" placeholder="Sexo" required value={formData.sexo} onChange={handleChange} options={[
            { label: "Masculino", value: "Masculino" }, { label: "Feminino", value: "Feminino" }
          ]} />
          <FormInput id="dtNascimento" label="Data de Nascimento:" placeholder="" type="date" required value={formData.dtNascimento} onChange={handleChange} />
          <FormInput id="natural" label="Naturalidade:" placeholder="Naturalidade" type="text" value={formData.natural} onChange={handleChange} />
          <FormInput id="profissao" label="Profissão:" placeholder="Profissão" type="text" />
          <FormSelect id="escola" label="Escolaridade:" placeholder="Escolaridade" value={formData.escola} onChange={handleChange} options={[
            { label: "Fundamental", value: "Fundamental" }, { label: "Médio", value: "Médio" }, { label: "Superior", value: "Superior"}
          ]} />
          <FormSelect id="estadoCivil" label="Estado Civil:" placeholder="Estado Civil" required value={formData.estadoCivil} onChange={handleChange} options={[
            { label: "Solteiro", value: "Solteiro" }, { label: "Casado", value: "Casado" }, { label: "Divorciado", value: "Divorciado"}
          ]} />
          <FormInput id="numTel" label="Telefone:" placeholder="(xx) xxxxx-xxxx" type="text" required value={formData.numTel} onChange={handleChange} />
          <FormInput id="email" label="Email:" placeholder="Email" type="email" required value={formData.email} onChange={handleChange} />
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">ENDEREÇO</h4>
        <div className={inputstyle}>
          <FormInput id="cep" label="CEP:" placeholder="xxxxx-xxx" type="text" required value={formData.cep} onChange={handleChange} />
          <FormInput id="endereco" label="Endereço:" placeholder="Endereço" type="text" required value={formData.endereco} onChange={handleChange} />
          <FormInput id="complemento" label="Complemento:" placeholder="Complemento" type="text" />
          <FormInput id="bairro" label="Bairro:" placeholder="Bairro" type="text" required value={formData.bairro} onChange={handleChange} />
          <FormInput id="cidade" label="Cidade:" placeholder="Cidade" type="text" required value={formData.cidade} onChange={handleChange} />
          <FormSelect id="uf" placeholder="UF" label="UF:" value={formData.uf} onChange={handleChange} options={estadosBrasil}/>
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">TRABALHO</h4>
        <div className={inputstyle}>
          <FormInput id="empresaLocal" label="Local de Trabalho:" placeholder="Local de Trabalho" type="text" value={formData.empresaLocal} onChange={handleChange}/>
          <FormInput id="empresaTel" label="Telefone da Empresa:" placeholder="(xx) xxxxx-xxxx" type="text" value={formData.empresaTel} onChange={handleChange} />
        </div>

        <h3 className="my-5 font-bold">DADOS FAMILIARES</h3>
        <div className={inputstyle}>
          <FormInput id="pai" label="Nome do Pai:" placeholder="Nome do Pai" type="text" value={formData.pai} onChange={handleChange}/>
          <FormInput id="mae" label="Nome da Mãe:" placeholder="Nome da Mãe" type="text" value={formData.mae} onChange={handleChange} />
          <FormInput id="numFilhos" label="Nº de Filhos:" placeholder="Nº de filhos" type="number" value={formData.numFilhos} onChange={handleChange}/>
          <FormInput id="conjuge" label="Nome do Cônjuge:" placeholder="Nome do Cônjuge" type="text" value={formData.conjuge} onChange={handleChange} disabled={formData.estadoCivil !== 'Casado'}/>
          <FormInput id="conjugeTel" label="Telefone do Cônjuge:" placeholder="(xx) xxxxx-xxxx" value={formData.conjugeTel} onChange={handleChange} disabled={formData.estadoCivil !== 'Casado'} />
          <FormInput id="dtCasamento" label="Data do Casamento:" placeholder="" type="date" value={formData.dtCasamento} onChange={handleChange} disabled={formData.estadoCivil !== 'Casado'} />
        </div>

        <h3 className="my-5 font-bold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <FormInput id="ministerio" label="Ministério que faz parte:" placeholder="Ministério que faz parte" type="text" value={formData.ministerio} onChange={handleChange} />
          <FormInput id="ministerioFunc" label="Função que exerce:" placeholder="Função que exerce" type="text" value={formData.ministerioFunc} onChange={handleChange} />
          <FormCheckbox id="gfcdLider" label="Lider de GFCD?" checked={formData.gfcdLider} onChange={handleChange} />
          <FormInput id="dtConversao" label="Data da Conversão:" placeholder="" type="date" required value={formData.dtConversao} onChange={handleChange}/>
          <FormCheckbox id="batizado" label="Batizado?" checked={formData.batizado} onChange={handleChange} />
          <FormInput id="igrejaBatizado" label="Igreja do Batismo" placeholder="Igreja do Batismo" type="text" value={formData.igrejaBatizado} onChange={handleChange} disabled={!formData.batizado} />
          <FormInput id="dtBatismo" label="Data do Batismo" placeholder="" type="date" value={formData.dtBatismo} onChange={handleChange} disabled={!formData.batizado}/>
          <FormSelect id="tipoAdmissao" label="Tipo de Admissão:" placeholder="Tipo de Admissão" value={formData.tipoAdmissao} onChange={handleChange} options={[
            { label: "Batismo", value: "Batismo" }, { label: "Vindo de outra igreja", value: "Vindo de outra igreja" }, { label: "Carta de transferência", value: "Carta de transferência"}
          ]} />
          <FormInput id="dtAdmissao" label="Data da Admissão:" placeholder="" type="date" value={formData.dtAdmissao} onChange={handleChange}/>
        </div>

        <h3 className="my-5 font-bold">DADOS ADICIONAIS</h3>
        <div className={inputstyle}>
          <FormSelect id="gfcdFrequentado" label="GFCD que frequenta:" placeholder="GFCD que frequenta" value={formData.gfcdFrequentado} onChange={handleChange} options={[
            { label: "CELULA", value: "CELULA 1" }, { label: "CELULA", value: "CELULA 2" },
            { label: "CELULA", value: "CELULA 3" }, { label: "CELULA", value: "CELULA 4" },
            { label: "CELULA", value: "CELULA 5" }, { label: "CELULA", value: "CELULA 6" },
          ]} />
          <FormCheckbox id="gfcdConsolidado" label="Já foi consolidado?" checked={formData.gfcdConsolidado} onChange={handleChange}/>
          <FormInput id="nomeConsolidador" label="Nome do Consolidador:" placeholder="Nome do Consolidador" type="text" value={formData.nomeConsolidador} onChange={handleChange} disabled={!formData.gfcdConsolidado}/>
          <FormSelect id="retiro" label="Já fez retiro?" placeholder="Já fez retiro?" value={formData.retiro} onChange={handleChange} options={[
            { label: "Pre-encontro", value: "Pre-encontro" }, { label: "Encontro", value: "Encontro"}, { label: "Pós-encontro", value: "Pós-encontro"}
          ]} />
        </div>

        <div className="flex justify-center gap-4">
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
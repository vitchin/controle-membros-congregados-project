"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";
import { FormSelect } from "./componentSelect";
import { FormCheckbox } from "./componentCheckbox";

const inputstyle = "mb-6 w-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

export function Register() {

  const estadosBrasil = [
    { label: "Acre (AC)", value: "AC" },
    { label: "Alagoas (AL)", value: "AL" },
    { label: "Amapá (AP)", value: "AP" },
    { label: "Amazonas (AM)", value: "AM" },
    { label: "Bahia (BA)", value: "BA" },
    { label: "Ceará (CE)", value: "CE" },
    { label: "Distrito Federal (DF)", value: "DF" },
    { label: "Espírito Santo (ES)", value: "ES" },
    { label: "Goiás (GO)", value: "GO" },
    { label: "Maranhão (MA)", value: "MA" },
    { label: "Mato Grosso (MT)", value: "MT" },
    { label: "Mato Grosso do Sul (MS)", value: "MS" },
    { label: "Minas Gerais (MG)", value: "MG" },
    { label: "Pará (PA)", value: "PA" },
    { label: "Paraíba (PB)", value: "PB" },
    { label: "Paraná (PR)", value: "PR" },
    { label: "Pernambuco (PE)", value: "PE" },
    { label: "Piauí (PI)", value: "PI" },
    { label: "Rio de Janeiro (RJ)", value: "RJ" },
    { label: "Rio Grande do Norte (RN)", value: "RN" },
    { label: "Rio Grande do Sul (RS)", value: "RS" },
    { label: "Rondônia (RO)", value: "RO" },
    { label: "Roraima (RR)", value: "RR" },
    { label: "Santa Catarina (SC)", value: "SC" },
    { label: "São Paulo (SP)", value: "SP" },
    { label: "Sergipe (SE)", value: "SE" },
    { label: "Tocantins (TO)", value: "TO" }
  ]

  return (
    <section className="text-[#350700] container w-full h-full mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">REGISTRAR</h2>
      <p className="mb-5 text-center text-gray-500">Informe seus dados pessoais, familiares e ministeriais para completar o registro.</p>
      
      <form className="w-full">
        <h3 className="mb-5 font-bold">DADOS PESSOAIS</h3>
        <div className={inputstyle}>
          <FormInput id="nome" label="Nome:" placeholder="Nome completo" required />
          <FormInput id="apelido" label="Nome social:" placeholder="Nome social" type="text" />
          <FormSelect id="sexo" label="Sexo:" placeholder="Sexo" required options={[
            { label: "Masculino", value: "1" },
            { label: "Feminino", value: "2" }
          ]} />
          <FormInput id="dtNascimento" label="Data de Nascimento:" placeholder="" type="date" required />
          <FormInput id="natural" label="Naturalidade:" placeholder="Naturalidade" type="text" />
          <FormInput id="profissao" label="Profissão:" placeholder="Profissão" type="text" />
          <FormSelect id="escola" label="Escolaridade:" placeholder="Escolaridade" options={[
            { label: "Fundamental", value: "1" },
            { label: "Médio", value: "2" },
            { label: "Superior", value: "3"}
          ]} />
          <FormSelect id="estadoCivil" label="Estado Civil:" placeholder="Estado Civil" required options={[
            { label: "Solteiro", value: "1" },
            { label: "Casado", value: "2" },
            { label: "Divorciado", value: "3"}
          ]} />
          <FormInput id="numTel" label="Telefone:" placeholder="(xx) xxxxx-xxxx" type="number" required />
          <FormInput id="email" label="Email:" placeholder="Email" type="email" required />
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">ENDEREÇO</h4>
        <div className={inputstyle}>
          <FormInput id="cep" label="CEP:" placeholder="xxxxx-xxx" type="number" required />
          <FormInput id="endereco" label="Endereço:" placeholder="Endereço" type="text" required />
          <FormInput id="complemento" label="Complemento:" placeholder="Complemento" type="text" />
          <FormInput id="bairro" label="Bairro:" placeholder="Bairro" type="text" required />
          <FormInput id="cidade" label="Cidade:" placeholder="Cidade" type="text" required />
          <FormSelect id="uf" placeholder="UF" label="UF:" options={estadosBrasil}/>
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">TRABALHO</h4>
        <div className={inputstyle}>
          <FormInput id="empresaLocal" label="Local de Trabalho:" placeholder="Local de Trabalho" type="text"/>
          <FormInput id="empresaTel" label="Telefone da Empresa:" placeholder="(xx) xxxxx-xxxx" type="number" />
        </div>

        <h3 className="my-5 font-bold">DADOS FAMILIARES</h3>
        <div className={inputstyle}>
          <FormInput id="pai" label="Nome do Pai:" placeholder="Nome do Pai" type="text" />
          <FormInput id="mae" label="Nome da Mãe:" placeholder="Nome da Mãe" type="text" />
          <FormInput id="numFilhos" label="Nº de Filhos:" placeholder="Nº de filhos" type="number"/>
          <FormInput id="conjuge" label="Nome do Cônjuge:" placeholder="Nome do Cônjuge" type="text"/>
          <FormInput id="conjugeTel" label="Telefone do Cônjuge:" placeholder="(xx) xxxxx-xxxx" />
          <FormInput id="dtCasamento" label="Data do Casamento:" placeholder="" type="date" />
        </div>

        <h3 className="my-5 font-bold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <FormInput id="ministerio" label="Ministério que faz parte:" placeholder="Ministério que faz parte" type="text" />
          <FormInput id="ministerioFunc" label="Função que exerce:" placeholder="Função que exerce" type="text" />
          <FormCheckbox id="gfcdLider" label="Lider de GFCD?" />
          <FormInput id="dtConversao" label="Data da Conversão:" placeholder="" type="date" required/>
          <FormCheckbox id="batizado" label="Batizado?" />
          <FormInput id="igrejaBatizado" label="Igreja do Batismo" placeholder="Igreja do Batismo" type="text" />
          <FormInput id="dtBatismo" label="Data do Batismo" placeholder="" type="date"/>
          <FormSelect id="tipoAdmissao" label="Tipo de Admissão:" placeholder="Tipo de Admissão" options={[
            { label: "Batismo", value: "1" },
            { label: "Vindo de outra igreja", value: "2" },
            { label: "Carta de transferência", value: "3"}
          ]} />
          <FormInput id="dtAdmissao" label="Data da Admissão:" placeholder="" type="date"/>
        </div>

        <h3 className="my-5 font-bold">DADOS ADICIONAIS</h3>
        <div className={inputstyle}>
          <FormSelect id="gfcdFrequentado" label="GFCD que frequenta:" placeholder="GFCD que frequenta" options={[ 
            { label: "CELULA", value: "1" },
            { label: "CELULA", value: "2" },
            { label: "CELULA", value: "3" },
            { label: "CELULA", value: "4" },
            { label: "CELULA", value: "5" },
            { label: "CELULA", value: "6" },              
          ]} />
          <FormCheckbox id="gfcdConsolidado" label="Já foi consolidado?"/>
          <FormInput id="nomeConsolidador" label="Nome do Consolidador:" placeholder="Nome do Consolidador" type="text"/>
          <FormSelect id="retiro" label="Já fez retiro?" placeholder="Já fez retiro?" options={[
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
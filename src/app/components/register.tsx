"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";
import { FormSelect } from "./componentSelect";
import { FormCheckbox } from "./componentCheckbox";
import { database } from "@/lib/firebase";
import { ref, set, push, get, update } from "firebase/database";

const inputstyle = "mb-6 w-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

type FormData = {
  nome: string; sexo: string; dtNascimento: string; estadoCivil: string; numTel: string; email: string; cep: string;
  endereco: string; cidade: string; bairro: string; uf: string; natural: string; apelido: string; escola: string;
  empresaTel: string; empresaLocal: string; conjuge: string; conjugeTel: string; dtCasamento: string;
  pai: string; mae: string; numFilhos: number | ""; ministerio: string; ministerioFunc: string;
  gfcdLider: boolean; dtBatismo: string; batizado: boolean; igrejaBatizado: string;
  dtAdmissao: string; tipoAdmissao: string; dtConversao: string; gfcdFrequentado: string;
  gfcdConsolidado: boolean; nomeConsolidador: string; retiro: string; profissao: string;
};

const initialFormData: FormData = {
  nome: "", sexo: "", dtNascimento: "", estadoCivil: "", numTel: "", email: "", cep: "",
  endereco: "", cidade: "", bairro: "", uf: "", natural: "", apelido: "", escola: "",
  empresaTel: "", empresaLocal: "", conjuge: "", conjugeTel: "", dtCasamento: "",
  pai: "", mae: "", numFilhos: "", ministerio: "", ministerioFunc: "",
  gfcdLider: false, dtBatismo: "", batizado: false, igrejaBatizado: "",
  dtAdmissao: "", tipoAdmissao: "", dtConversao: "", gfcdFrequentado: "",
  gfcdConsolidado: false, nomeConsolidador: "", retiro: "", profissao: "",
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
  const params = useParams();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [personId, setPersonId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cepError, setCepError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");

    const { id } = params;
    if (id && typeof id === 'string') {
      setIsEditMode(true);
      setPersonId(id);
      const personRef = ref(database, 'membros/' + id);
      get(personRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormData({ ...initialFormData, ...snapshot.val() });
        } else {
          console.error("No data available for this ID");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [params]);

  // Funções auxiliares
  function formatTextOnly(value: string): string {
    return value.replace(/[0-9]/g, '').toUpperCase();
  }

  function formatPhone(value: string): string {
    const numericValue = value.replace(/\D/g, '').slice(0, 11);

    if (numericValue.length > 6) {
      return numericValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } 
    if (numericValue.length > 2) {
      return numericValue.replace(/^(\d{2})(\d*)/, '($1) $2');
    }
    return numericValue;
  }

  function formatNumber(value: string): number | string {
    return value === '' ? '' : Number(value);
  }

  function formatCep(value: string): string {
    const numericCep = value.replace(/\D/g, '').slice(0, 8);
    return numericCep.length > 5 ? numericCep.replace(/^(\d{5})(\d{3}).*/, '$1-$2') : numericCep;
  }

  const manipularMudancaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target as HTMLInputElement & { id: keyof FormData };

    const textOnlyFields = ['nome', 'apelido', 'natural', 'profissao', 'bairro', 'cidade', 'empresaLocal', 'pai', 'mae', 'conjuge', 'ministerio', 'ministerioFunc', 'igrejaBatizado', 'nomeConsolidador'];
    const phoneFields = ['numTel', 'empresaTel', 'conjugeTel'];
    const cepField = 'cep';

    let finalValue: string | number = value;

    if (textOnlyFields.includes(id)) {
      finalValue = formatTextOnly(value);
    } else if (phoneFields.includes(id)) {
      finalValue = formatPhone(value);
    } else if (type === 'number') {
      finalValue = formatNumber(value);
    } else if (id === cepField) {
      finalValue = formatCep(value);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: finalValue,
    }));
  };

  const manipularMudancaSelect = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const manipularMudancaCheckbox = (id: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const manipularBlurCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if(cep === "")
      return;

    if (cep.length !== 8)
      return setCepError("CEP inválido. Deve conter 8 dígitos.");

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
      console.error("Erro ao request CEP:", error);
      setCepError("Erro ao buscar CEP. Verifique sua conexão.");
    }
  };

  const submeterFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    try {
      if (isEditMode && personId) {
        const personRef = ref(database, 'membros/' + personId);
        await update(personRef, formData);
        setSuccessMessage("Registro atualizado com sucesso!");
      } else {
        const newPersonRef = push(ref(database, 'membros'));
        await set(newPersonRef, formData);
        setSuccessMessage("Registro concluído com sucesso!");
        setFormData(initialFormData); // Clear form only on new registration
      }
    } catch (error) {
      console.error("Erro ao salvar dados no Firebase:", error);
    }
  };

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
  ];

  return (
    <section className="text-[#350700] container w-full h-full mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">
        {isEditMode ? "EDITAR REGISTRO" : "REGISTRAR"}
      </h2>
      <p className="mb-5 text-center text-gray-500">
        Informe seus dados pessoais, familiares e ministeriais para completar o registro.
      </p>
      
      <form className="w-full" onSubmit={submeterFormulario}>
        <h3 className="mb-5 font-bold">DADOS PESSOAIS</h3>
        <div className={inputstyle}>
          <FormInput id="nome" label="Nome:" placeholder="Nome completo" required value={formData.nome} onChange={manipularMudancaInput} disabled={isEditMode} />
          <FormInput id="apelido" label="Nome social:" placeholder="Nome social" type="text" value={formData.apelido} onChange={manipularMudancaInput} />
          <FormSelect id="sexo" label="Sexo:" placeholder="Sexo" required value={formData.sexo} onChange={(value) => manipularMudancaSelect('sexo', value)} options={[
            { label: "Masculino", value: "Masculino" }, { label: "Feminino", value: "Feminino" }
          ]} />
          <FormInput id="dtNascimento" label="Data de Nascimento:" placeholder="" type="date" required value={formData.dtNascimento} onChange={manipularMudancaInput} />
          <FormInput id="natural" label="Naturalidade:" placeholder="Naturalidade" type="text" value={formData.natural} onChange={manipularMudancaInput} />
          <FormInput id="profissao" label="Profissão:" placeholder="Profissão" type="text" value={formData.profissao} onChange={manipularMudancaInput} />
          <FormSelect id="escola" label="Escolaridade:" placeholder="Escolaridade" value={formData.escola} onChange={(value) => manipularMudancaSelect('escola', value)} options={[
            { label: "Fundamental", value: "Fundamental" }, { label: "Médio", value: "Médio" }, { label: "Superior", value: "Superior"}
          ]} />
          <FormSelect id="estadoCivil" label="Estado Civil:" placeholder="Estado Civil" required value={formData.estadoCivil} onChange={(value) => manipularMudancaSelect('estadoCivil', value)} options={[
            { label: "Solteiro", value: "Solteiro" }, { label: "Casado", value: "Casado" }, { label: "Divorciado", value: "Divorciado"}
          ]} />
          <FormInput id="numTel" label="Telefone:" placeholder="(xx) xxxxx-xxxx" type="text" required value={formData.numTel} onChange={manipularMudancaInput} />
          <FormInput id="email" label="Email:" placeholder="Email" type="email" required value={formData.email} onChange={manipularMudancaInput} />
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">ENDEREÇO</h4>
        <div className={inputstyle}>
          <FormInput id="endereco" label="Endereço:" placeholder="Endereço" type="text" required value={formData.endereco} onChange={manipularMudancaInput} />
          <div>
            <FormInput id="cep" label="CEP:" placeholder="xxxxx-xxx" type="text" value={formData.cep} onChange={manipularMudancaInput} onBlur={manipularBlurCep} />
            {cepError && <p className="text-red-500 text-xs mt-1">{cepError}</p>}
          </div>
          <FormInput id="bairro" label="Bairro:" placeholder="Bairro" type="text" value={formData.bairro} onChange={manipularMudancaInput} />
          <FormInput id="cidade" label="Cidade:" placeholder="Cidade" type="text" value={formData.cidade} onChange={manipularMudancaInput} />
          <FormSelect id="uf" placeholder="UF" label="UF:" value={formData.uf} onChange={(value) => manipularMudancaSelect('uf', value)} options={estadosBrasil}/>
        </div>
        <h4 className="my-8 text-xs text-[#33070198] font-bold select-none">TRABALHO</h4>
        <div className={inputstyle}>
          <FormInput id="empresaLocal" label="Local de Trabalho:" placeholder="Local de Trabalho" type="text" value={formData.empresaLocal} onChange={manipularMudancaInput}/>
          <FormInput id="empresaTel" label="Telefone da Empresa:" placeholder="(xx) xxxxx-xxxx" type="text" value={formData.empresaTel} onChange={manipularMudancaInput} />
        </div>

        <h3 className="my-5 font-bold">DADOS FAMILIARES</h3>
        <div className={inputstyle}>
          <FormInput id="pai" label="Nome do Pai:" placeholder="Nome do Pai" type="text" value={formData.pai} onChange={manipularMudancaInput}/>
          <FormInput id="mae" label="Nome da Mãe:" placeholder="Nome da Mãe" type="text" value={formData.mae} onChange={manipularMudancaInput} />
          <FormInput id="numFilhos" label="Nº de Filhos:" placeholder="Nº de filhos" type="number" value={String(formData.numFilhos)} onChange={manipularMudancaInput}/>
          <FormInput id="conjuge" label="Nome do Cônjuge:" placeholder="Nome do Cônjuge" type="text" value={formData.conjuge} onChange={manipularMudancaInput} disabled={formData.estadoCivil !== 'Casado'}/>
          <FormInput id="conjugeTel" label="Telefone do Cônjuge:" placeholder="(xx) xxxxx-xxxx" value={formData.conjugeTel} onChange={manipularMudancaInput} disabled={formData.estadoCivil !== 'Casado'} />
          <FormInput id="dtCasamento" label="Data do Casamento:" placeholder="" type="date" value={formData.dtCasamento} onChange={manipularMudancaInput} disabled={formData.estadoCivil !== 'Casado'} />
        </div>

        <h3 className="my-5 font-bold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <FormInput id="ministerio" label="Ministério que faz parte:" placeholder="Ministério que faz parte" type="text" value={formData.ministerio} onChange={manipularMudancaInput} />
          <FormInput id="ministerioFunc" label="Função que exerce:" placeholder="Função que exerce" type="text" value={formData.ministerioFunc} onChange={manipularMudancaInput} />
          <FormCheckbox id="gfcdLider" label="Lider de GFCD?" checked={formData.gfcdLider} onCheckedChange={(checked) => manipularMudancaCheckbox('gfcdLider', checked)} />
          <FormInput id="dtConversao" label="Data da Conversão:" placeholder="" type="date" required value={formData.dtConversao} onChange={manipularMudancaInput}/>
          <FormCheckbox id="batizado" label="Batizado?" checked={formData.batizado} onCheckedChange={(checked) => manipularMudancaCheckbox('batizado', checked)} />
          <FormInput id="igrejaBatizado" label="Igreja do Batismo" placeholder="Igreja do Batismo" type="text" value={formData.igrejaBatizado} onChange={manipularMudancaInput} disabled={!formData.batizado} />
          <FormInput id="dtBatismo" label="Data do Batismo" placeholder="" type="date" value={formData.dtBatismo} onChange={manipularMudancaInput} disabled={!formData.batizado}/>
          <FormSelect id="tipoAdmissao" label="Tipo de Admissão:" placeholder="Tipo de Admissão" value={formData.tipoAdmissao} onChange={(value) => manipularMudancaSelect('tipoAdmissao', value)} options={[
            { label: "Batismo", value: "Batismo" }, { label: "Aclamação", value: "Aclamação" }, { label: "Transferência", value: "Transferência"}
          ]} />
          <FormInput id="dtAdmissao" label="Data da Admissão:" placeholder="" type="date" value={formData.dtAdmissao} onChange={manipularMudancaInput}/>
        </div>

        <h3 className="my-5 font-bold">DADOS ADICIONAIS</h3>
        <div className={inputstyle}>
          <FormSelect id="gfcdFrequentado" label="GFCD que frequenta:" placeholder="GFCD que frequenta" value={formData.gfcdFrequentado} onChange={(value) => manipularMudancaSelect('gfcdFrequentado', value)} options={[
            { label: "CELULA", value: "CELULA 1" }, { label: "CELULA", value: "CELULA 2" },
            { label: "CELULA", value: "CELULA 3" }, { label: "CELULA", value: "CELULA 4" },
            { label: "CELULA", value: "CELULA 5" }, { label: "CELULA", value: "CELULA 6" },
          ]} />
          <FormCheckbox id="gfcdConsolidado" label="Já foi consolidado?" checked={formData.gfcdConsolidado} onCheckedChange={(checked) => manipularMudancaCheckbox('gfcdConsolidado', checked)}/>
          <FormInput id="nomeConsolidador" label="Nome do Consolidador:" placeholder="Nome do Consolidador" type="text" value={formData.nomeConsolidador} onChange={manipularMudancaInput} disabled={!formData.gfcdConsolidado}/>
          <FormSelect id="retiro" label="Já fez retiro?" placeholder="Já fez retiro?" value={formData.retiro} onChange={(value) => manipularMudancaSelect('retiro', value)} options={[
            { label: "Pre-encontro", value: "Pre-encontro" }, { label: "Encontro", value: "Encontro"}, { label: "Pós-encontro", value: "Pós-encontro"}
          ]} />
        </div>

        {successMessage && (
          <div className="text-center text-green-600 font-semibold my-4 p-3 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {isLoggedIn && (
            <Button
              id="btn-back"
              variant="secondary"
              className="w-full sm:w-auto flex-1"
              onClick={() => router.push('/table')}
            >
              VOLTAR PARA A TABELA
            </Button>
          )}
          <Button
            id="btn-register"
            type="submit" variant="default"
            className="w-full sm:w-auto flex-1">
            {isEditMode ? "CONFIRMAR" : "REGISTRAR"}
          </Button>
        </div>
      </form>
    </section>
  );
}
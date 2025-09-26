"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "./componentInput";
import { FormSelect } from "./componentSelect";
import { FormCheckbox } from "./componentCheckbox";

// Definindo o tipo User localmente, pois a API foi removida.
// Apenas os campos usados no formulário são mantidos.
type User = {
  id: string;
  nome: string;
  sexo: string;
  dtNascimento: string;
  estadoCivil: string;
  numTel: string;
  email: string;
  cep: string;
  endereco: string;
  cidade: string;
  bairro: string;
  uf: string;
  natural: string;
  apelido: string;
  escola: string;
  empresaTel: string;
  empresaLocal: string;
  conjuge: string;
  conjugeTel: string;
  dtCasamento: string;
  pai: string;
  mae: string;
  numFilhos: number | null;
  ministerio: string;
  ministerioFunc: string;
  gfcdLider: boolean;
  dtBatismo: string;
  batizado: boolean;
  igrejaBatizado: string;
  dtAdmissao: string;
  tipoAdmissao: string;
  dtConversao: string;
  gfcdFrequentado: string;
  gfcdConsolidado: boolean;
  formaConsolidacao: string;
  outrosFormaConsolidacao?: string;
  igrejaAnterior?: string;
  retiro: string;
  profissao: string;
};


const inputstyle = "mb-6 w-full grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

const initialFormData: User = {
  id: "",
  nome: "",
  sexo: "",
  dtNascimento: "",
  estadoCivil: "",
  numTel: "",
  email: "",
  cep: "",
  endereco: "",
  cidade: "",
  bairro: "",
  uf: "",
  natural: "",
  apelido: "",
  escola: "",
  empresaTel: "",
  empresaLocal: "",
  conjuge: "",
  conjugeTel: "",
  dtCasamento: "",
  pai: "",
  mae: "",
  numFilhos: null,
  ministerio: "",
  ministerioFunc: "",
  gfcdLider: false,
  dtBatismo: "",
  batizado: false,
  igrejaBatizado: "",
  dtAdmissao: "",
  tipoAdmissao: "",
  dtConversao: "",
  gfcdFrequentado: "",
  gfcdConsolidado: false,
  formaConsolidacao: "",
  retiro: "",
  profissao: "",
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
  const [formData, setFormData] = useState<User>(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cepError, setCepError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  function formatNumber(value: string): number | null {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
  }

  function formatCep(value: string): string {
    const numericCep = value.replace(/\D/g, '').slice(0, 8);
    return numericCep.length > 5 ? numericCep.replace(/^(\d{5})(\d{3}).*/, '$1-$2') : numericCep;
  }

  const manipularMudancaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target as HTMLInputElement & { id: keyof User };

    const textOnlyFields: (keyof User)[] = ['nome', 'apelido', 'natural', 'profissao', 'bairro', 'cidade', 'empresaLocal', 'pai', 'mae', 'conjuge', 'ministerio', 'ministerioFunc', 'igrejaBatizado', 'igrejaAnterior', 'outrosFormaConsolidacao'];
    const phoneFields: (keyof User)[] = ['numTel', 'empresaTel', 'conjugeTel'];
    const cepField: keyof User = 'cep';

    let finalValue: string | number | null = value;

    if (textOnlyFields.includes(id as keyof User)) {
      finalValue = formatTextOnly(value);
    } else if (phoneFields.includes(id as keyof User)) {
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

  const manipularMudancaSelect = (id: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const manipularMudancaCheckbox = (id: keyof User, checked: boolean) => {
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

  useEffect(() => {
    const { id } = params;
    if (id && typeof id === 'string') {
      setIsEditMode(true);
      // Lógica para carregar dados de um mock ou deixar em branco, já que a API foi removida
      console.log("Modo de edição para o ID:", id);
    }
  }, [params]);

  const submeterFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de submissão removida. Apenas exibe uma mensagem de sucesso.
    setSuccessMessage(isEditMode ? "Registro atualizado com sucesso! (Simulado)" : "Registro concluído com sucesso! (Simulado)");
    if (!isEditMode) {
      setFormData(initialFormData);
    }
    // Opcional: redirecionar para a tabela após um tempo
    setTimeout(() => {
        setSuccessMessage("");
        // router.push('/table');
    }, 3000);
  };

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
          <FormInput id="apelido" label="Conhecido Por:" placeholder="Conhecido Por..." type="text" value={formData.apelido} onChange={manipularMudancaInput} />
          <FormSelect id="sexo" label="Sexo:" placeholder="Selecione..." required value={formData.sexo} onChange={(value) => manipularMudancaSelect('sexo', value)} options={[
            { label: "MASCULINO", value: "masculino" }, { label: "FEMININO", value: "feminino" }
          ]} />
          <FormInput id="dtNascimento" label="Data de Nascimento:" placeholder="" type="date" required value={formData.dtNascimento} onChange={manipularMudancaInput} />
          <FormInput id="natural" label="Naturalidade:" placeholder="Naturalidade" type="text" value={formData.natural} onChange={manipularMudancaInput} />
          <FormInput id="profissao" label="Profissão:" placeholder="Profissão" type="text" value={formData.profissao} onChange={manipularMudancaInput} />
          <FormSelect id="escola" label="Escolaridade:" placeholder="Selecione..." value={formData.escola} onChange={(value) => manipularMudancaSelect('escola', value)} options={[
            { label: "NENHUM", value: "nenhum" },
            { label: "FUNDAMENTAL", value: "nundamental" },
            { label: "MÉDIO", value: "medio" },
            { label: "SUPERIOR", value: "superior" }
          ]} />
          <FormSelect id="estadoCivil" label="Estado Civil:" placeholder="Selecione..." required value={formData.estadoCivil} onChange={(value) => manipularMudancaSelect('estadoCivil', value)} options={[
            { label: "SOLTEIRO", value: "Solteiro" }, 
            { label: "CASADO", value: "Casado" }, 
            { label: "DIVORCIADO", value: "Divorciado"}, 
            { label: "UNIÃO ESTÁVEL", value: "União estável" }
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
          <FormSelect id="uf" placeholder="Selecione..." label="UF:" value={formData.uf} onChange={(value) => manipularMudancaSelect('uf', value)} options={[
            { label: "ACRE (AC)", value: "ac" },
            { label: "ALAGOAS (AL)", value: "al" },
            { label: "AMAPÁ (AP)", value: "ap" },
            { label: "AMAZONAS (AM)", value: "am" },
            { label: "BAHIA (BA)", value: "ba" },
            { label: "CEARÁ (CE)", value: "ce" },
            { label: "DISTRITO FEDERAL (DF)", value: "df" },
            { label: "ESPÍRITO SANTO (ES)", value: "es" },
            { label: "GOIÁS (GO)", value: "go" },
            { label: "MARANHÃO (MA)", value: "ma" },
            { label: "MATO GROSSO (MT)", value: "mt" },
            { label: "MATO GROSSO DO SUL (MS)", value: "ms" },
            { label: "MINAS GERAIS (MG)", value: "mg" },
            { label: "PARÁ (PA)", value: "pa" },
            { label: "PARAÍBA (PB)", value: "pb" },
            { label: "PARANÁ (PR)", value: "pr" },
            { label: "PERNAMBUCO (PE)", value: "pe" },
            { label: "PIAUÍ (PI)", value: "pi" },
            { label: "RIO DE JANEIRO (RJ)", value: "rj" },
            { label: "RIO GRANDE DO NORTE (RN)", value: "rn" },
            { label: "RIO GRANDE DO SUL (RS)", value: "rs" },
            { label: "RONDÔNIA (RO)", value: "ro" },
            { label: "RORAIMA (RR)", value: "rr" },
            { label: "SANTA CATARINA (SC)", value: "sc" },
            { label: "SÃO PAULO (SP)", value: "sp" },
            { label: "SERGIPE (SE)", value: "se" },
            { label: "TOCANTINS (TO)", value: "to" }
        ]} />
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
          <FormInput id="numFilhos" label="Nº de Filhos:" placeholder="Nº de filhos" type="number" value={formData.numFilhos !== null && formData.numFilhos !== undefined ? String(formData.numFilhos) : '0'} onChange={manipularMudancaInput}/>
          <FormInput id="conjuge" label="Nome do Cônjuge:" placeholder="Nome do Cônjuge" type="text" value={formData.conjuge} onChange={manipularMudancaInput} disabled={formData.estadoCivil !== "Casado" && formData.estadoCivil !== "União estável"}/>
          <FormInput id="conjugeTel" label="Telefone do Cônjuge:" placeholder="(xx) xxxxx-xxxx" value={formData.conjugeTel} onChange={manipularMudancaInput} disabled={formData.estadoCivil !== "Casado" && formData.estadoCivil !== "União estável"} />
          <FormInput id="dtCasamento" label="Data do Casamento:" placeholder="" type="date" value={formData.dtCasamento} onChange={manipularMudancaInput} disabled={formData.estadoCivil !== "Casado" && formData.estadoCivil !== "União estável"} />
        </div>

        <h3 className="my-5 font-bold">DADOS ECLESIÁSTICOS</h3>
        <div className={inputstyle}>
          <FormInput id="ministerio" label="Cargo Ministerial:" placeholder="Ministério que faz parte" type="text" value={formData.ministerio} onChange={manipularMudancaInput} />
          <FormInput id="ministerioFunc" label="Função que exerce:" placeholder="Função que exerce" type="text" value={formData.ministerioFunc} onChange={manipularMudancaInput} />
          <FormCheckbox id="gfcdLider" label="Lider de GFCD?" checked={formData.gfcdLider} onCheckedChange={(checked) => manipularMudancaCheckbox('gfcdLider', checked)} />
          <FormInput id="dtConversao" label="Data da Conversão:" placeholder="" type="date" required value={formData.dtConversao} onChange={manipularMudancaInput}/>
          <FormCheckbox id="batizado" label="Batizado?" checked={formData.batizado} onCheckedChange={(checked) => manipularMudancaCheckbox('batizado', checked)} />
          <FormInput id="igrejaBatizado" label="Igreja do Batismo" placeholder="Igreja do Batismo" type="text" value={formData.igrejaBatizado} onChange={manipularMudancaInput} disabled={!formData.batizado} />
          <FormInput id="dtBatismo" label="Data do Batismo" placeholder="" type="date" value={formData.dtBatismo} onChange={manipularMudancaInput} disabled={!formData.batizado}/>
          <FormSelect id="tipoAdmissao" label="Tipo de Admissão:" placeholder="Selecione..." value={formData.tipoAdmissao} onChange={(value) => manipularMudancaSelect('tipoAdmissao', value)} options={[
            { label: "BATISMO", value: "batismo" }, { label: "ACLAMAÇÃO", value: "aclamacao" }, { label: "TRANSFERÊNCIA", value: "transferencia"}
          ]} />
          {formData.tipoAdmissao === 'transferencia' && (
            <FormInput id="igrejaAnterior" label="Igreja Anterior:" placeholder="Igreja Anterior" type="text" value={formData.igrejaAnterior || ''} onChange={manipularMudancaInput} />
          )}
          <FormInput id="dtAdmissao" label="Data da Admissão:" placeholder="" type="date" value={formData.dtAdmissao} onChange={manipularMudancaInput}/>
        </div>

        <h3 className="my-5 font-bold">DADOS MINISTERIAIS</h3>
        <div className={inputstyle}>
          <FormSelect id="gfcdFrequentado" label="GFCD Frequentado:" placeholder="Selecione..." value={formData.gfcdFrequentado} onChange={(value) => manipularMudancaSelect('gfcdFrequentado', value)} options={[
              { label: "NENHUM", value: "nenhum" },{ label: "PHILOS", value: "philos" },{ label: "JAVÉ SHAMMAH", value: "jave shammah" },
              { label: "RENASCER", value: "renascer" },{ label: "REUEL", value: "reuel" },
              { label: "KADOSH", value: "kadosh" },{ label: "RUAH", value: "ruah" },
              { label: "SHEKINAH", value: "shekinah" },{ label: "TEMPO DE DEUS", value: "tempo de deus" },
              { label: "PENIEL", value: "peniel" },{ label: "DEUS É FIEL", value: "deus e fiel" },
              { label: "LÍRIO DOS VALES", value: "lirio dos vales" },{ label: "KOINONIA", value: "koinonia" },
              { label: "JEOVÁ JIREH", value: "jeova jireh" },{ label: "HERDEIRAS DO REI", value: "herdeiras do rei" },
              { label: "AMAI", value: "amai" },{ label: "MULHERES DE EXCELÊNCIA", value: "mulheres de excelencia" },
              { label: "LEÃO DA TRIBO DE JUDÁ", value: "leao da tribo de juda" },{ label: "VIDA", value: "vida" },
              { label: "SIMPLISMENTE FILHAS", value: "simplesmente filhas" },{ label: "PRIMÍCIAS", value: "primicias" }
          ]} />
          <FormCheckbox id="gfcdConsolidado" label="Já foi consolidado?" checked={formData.gfcdConsolidado} onCheckedChange={(checked) => manipularMudancaCheckbox('gfcdConsolidado', checked)}/>
          <FormSelect id="formaConsolidacao" label="Forma de Consolidação:" placeholder="Selecione..." value={formData.formaConsolidacao} onChange={(value) => manipularMudancaSelect('formaConsolidacao', value)} options={[
              { label: "EBD", value: "ebd" },
              { label: "GFCD", value: "gfcd" },
              { label: "Outros", value: "outros" }
            ]}
          />
          {formData.formaConsolidacao === 'outros' && (
            <FormInput id="outrosFormaConsolidacao" label="Informe a Forma:" placeholder="Informe a Forma" type="text" value={formData.outrosFormaConsolidacao || ''} onChange={manipularMudancaInput}/>
          )}
          <FormSelect id="retiro" label="Encontro:" placeholder="Selecione..." value={formData.retiro} onChange={(value) => manipularMudancaSelect('retiro', value)} options={[
              { label: "NENHUM", value: "nenhum" },
              { label: "PRE-ENCONTRO", value: "pre_encontro" },
              { label: "ENCONTRO", value: "encontro" },
              { label: "PÓS-ENCONTRO", value: "pos_encontro" }
          ]} />
        </div>

        {successMessage && (
          <div className="text-center text-green-600 font-semibold my-4 p-3 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            id="btn-register"
            type="submit" variant="default"
            className="w-full sm:w-auto flex-1 max-w-xs">
            {isEditMode ? "CONFIRMAR" : "REGISTRAR"}
          </Button>
        </div>
      </form>
    </section>
  );
}
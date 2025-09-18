export interface User {
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
    retiro: string;
    profissao: string;
    igrejaAnterior?: string;
    dataExclusao?: string;
    motivoExclusao?: string;
    outrosMotivoExclusao?: string;
  }

  // Mock database
  export let users: User[] = [];

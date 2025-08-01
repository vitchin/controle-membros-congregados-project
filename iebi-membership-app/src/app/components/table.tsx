"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Pessoa = {
  nome: string
  sexo: string
  dataNascimento: string
  estadoCivil: string
  telefone: string
  email: string
  cep: string
  endereco: string
  cidade: string
  bairro: string
  uf: string
  naturalidade: string
  conhecidoPor: string
  escolaridade: string
  telefoneTrabalho: string
  localTrabalho: string
  nomeConjuge: string
  telefoneConjuge: string
  dataCasamento: string
  nomePai: string
  nomeMae: string
  numeroFilhos: number
  ministerio: string
  funcao: string
  liderGfcd: boolean
  dataBatismo: string
  batizado: boolean
  igrejaBatismo: string
  dataAdmissao: string
  tipoAdmissao: string
  algumaData: string
  gfcdFrequentado: string
  consolidadoPor: string
  nomeConsolidador: string
  retiro: string
}

const data: Pessoa[] = [
    {
        nome: "João Silva",
        sexo: "Masculino",
        dataNascimento: "1990-01-01",
        estadoCivil: "Casado",
        telefone: "(81) 91234-5678",
        email: "joao@example.com",
        cep: "54300-000",
        endereco: "Rua Exemplo, 123",
        cidade: "Jaboatão",
        bairro: "Centro",
        uf: "PE",
        naturalidade: "Recife",
        conhecidoPor: "Joãozinho",
        escolaridade: "Superior",
        telefoneTrabalho: "(81) 98765-4321",
        localTrabalho: "Empresa Exemplo",
        nomeConjuge: "Maria Silva",
        telefoneConjuge: "(81) 99876-5432",
        dataCasamento: "2015-06-15",
        nomePai: "José Silva",
        nomeMae: "Ana Souza",
        numeroFilhos: 2,
        ministerio: "Louvor",
        funcao: "Guitarrista",
        liderGfcd: true,
        dataBatismo: "2010-05-20",
        batizado: true,
        igrejaBatismo: "Igreja Exemplo",
        dataAdmissao: "2012-09-01",
        tipoAdmissao: "Batismo",
        algumaData: "2023-11-12",
        gfcdFrequentado: "DEUS É FIEL",
        consolidadoPor: "Carlos",
        nomeConsolidador: "Carlos Dias",
        retiro: "Encontro"
    }
]

export const columns: ColumnDef<Pessoa>[] = [
  { accessorKey: "nome", header: "Nome" }, { accessorKey: "sexo", header: "Sexo" },
  { accessorKey: "dataNascimento", header: "Nascimento" }, { accessorKey: "estadoCivil", header: "Estado Civil" },
  { accessorKey: "telefone", header: "Telefone" }, { accessorKey: "email", header: "Email" },
  { accessorKey: "cep", header: "CEP" }, { accessorKey: "endereco", header: "Endereço" },
  { accessorKey: "cidade", header: "Cidade" }, { accessorKey: "bairro", header: "Bairro" },
  { accessorKey: "uf", header: "UF" }, { accessorKey: "naturalidade", header: "Naturalidade" },
  { accessorKey: "conhecidoPor", header: "Conhecido por" }, { accessorKey: "escolaridade", header: "Escolaridade" },
  { accessorKey: "telefoneTrabalho", header: "Tel. Trabalho" }, { accessorKey: "localTrabalho", header: "Local Trabalho" },
  { accessorKey: "nomeConjuge", header: "Cônjuge" }, { accessorKey: "telefoneConjuge", header: "Tel. Cônjuge" },
  { accessorKey: "dataCasamento", header: "Casamento" }, { accessorKey: "nomePai", header: "Pai" },
  { accessorKey: "nomeMae", header: "Mãe" }, { accessorKey: "numeroFilhos", header: "N° Filhos" },
  { accessorKey: "ministerio", header: "Ministério" }, { accessorKey: "funcao", header: "Função" },
  { accessorKey: "liderGfcd",  header: "Líder GFCD?", cell: ({ row }) => (row.getValue("liderGfcd") ? "Sim" : "Não") },
  { accessorKey: "dataBatismo", header: "Batismo" },
  { accessorKey: "batizado", header: "Batizado?", cell: ({ row }) => (row.getValue("batizado") ? "Sim" : "Não") },
  { accessorKey: "igrejaBatismo", header: "Igreja Batismo" }, { accessorKey: "dataAdmissao", header: "Admissão" },
  { accessorKey: "tipoAdmissao", header: "Tipo Admissão" }, { accessorKey: "algumaData", header: "Data Extra" },
  { accessorKey: "gfcdFrequentado", header: "GFCD" }, { accessorKey: "consolidadoPor", header: "Consolidado por" },
  { accessorKey: "nomeConsolidador", header: "Consolidador" }, { accessorKey: "retiro", header: "Retiro" },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => console.log("Editar", row.original)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Excluir", row.original)}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]

export function TabelaPessoas() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters
    }
  })

  return (
    <div className="container max-w-screen-lg mx-auto my-10 px-5 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">TABELA MEMBROS/CONGREGADOS</h2>
        <p className="mb-4 text-center text-gray-500">Aqui estão os membros e congregados registrados.</p>

      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Button>
          GERAR RELATÓRIO EXCEL
        </Button>

      </div>

      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[1200px] text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap px-2 py-1"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap px-2 py-1 max-w-[200px] truncate"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

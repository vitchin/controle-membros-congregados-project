"use client"

import { exportTableToExcel } from "@/utils/exportExcel";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "../../../public/logout.svg";
import * as React from "react"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


type Pessoa = {
  nome: string
  sexo: string
  dtNascimento: string
  estadoCivil: string
  numTel: string
  email: string
  cep: string
  endereco: string
  cidade: string
  bairro: string
  uf: string
  natural: string
  apelido: string
  escola: string
  empresaTel: string
  empresaLocal: string
  conjuge: string
  conjugeTel: string
  dtCasamento: string
  pai: string
  mae: string
  numFilhos: number
  ministerio: string
  ministerioFunc: string
  gfcdLider: boolean
  dtBatismo: string
  batizado: boolean
  igrejaBatizado: string
  dtAdmissao: string
  tipoAdmissao: string
  dtConversao: string
  gfcdFrequentado: string
  gfcdConsolidado: string
  nomeConsolidador: string
  retiro: string
}

const data: Pessoa[] = [
    {
        nome: "João",
        sexo: "Masculino",
        dtNascimento: "1990/01/01",
        estadoCivil: "Casado",
        numTel: "(xx) xxxxx-xxxx",
        email: "joao@example.com",
        cep: "xxxxx-xxx",
        endereco: "Rua Exemplo, 123",
        cidade: "Jaboatão",
        bairro: "Centro",
        uf: "PE",
        natural: "Recife",
        apelido: "Zinho",
        escola: "Superior",
        empresaTel: "(xx) xxxxx-xxxx",
        empresaLocal: "EmpresaExemplo",
        conjuge: "Maria Silva",
        conjugeTel: "(xx) xxxxx-xxxx",
        dtCasamento: "2015/06/15",
        pai: "José Silva",
        mae: "Ana Souza",
        numFilhos: 2,
        ministerio: "Louvor",
        ministerioFunc: "Guitarrista",
        gfcdLider: true,
        dtBatismo: "2010/05/20",
        batizado: true,
        igrejaBatizado: "Igreja Exemplo",
        dtAdmissao: "2012/09/01",
        tipoAdmissao: "Batismo",
        dtConversao: "2023/11/12",
        gfcdFrequentado: "DEUS É FIEL",
        gfcdConsolidado: "Carlos",
        nomeConsolidador: "Carlos Dias",
        retiro: "Encontro"
    }
]

export const columns: ColumnDef<Pessoa>[] = [
  { accessorKey: "nome", header: "Nome" }, { accessorKey: "sexo", header: "Sexo" },
  { accessorKey: "dtNascimento", header: "Nascimento" }, { accessorKey: "estadoCivil", header: "Estado Civil" },
  { accessorKey: "numTel", header: "Telefone" }, { accessorKey: "email", header: "Email" },
  { accessorKey: "cep", header: "CEP" }, { accessorKey: "endereco", header: "Endereço" },
  { accessorKey: "cidade", header: "Cidade" }, { accessorKey: "bairro", header: "Bairro" },
  { accessorKey: "uf", header: "UF" }, { accessorKey: "natural", header: "Naturalidade" },
  { accessorKey: "apelido", header: "Conhecido por" }, { accessorKey: "escola", header: "Escolaridade" },
  { accessorKey: "empresaTel", header: "Tel. Trabalho" }, { accessorKey: "empresaLocal", header: "Local Trabalho" },
  { accessorKey: "conjuge", header: "Cônjuge" }, { accessorKey: "conjugeTel", header: "Tel. Cônjuge" },
  { accessorKey: "dtCasamento", header: "Casamento" }, { accessorKey: "pai", header: "Pai" },
  { accessorKey: "mae", header: "Mãe" }, { accessorKey: "numFilhos", header: "N° Filhos" },
  { accessorKey: "ministerio", header: "Ministério" }, { accessorKey: "ministerioFunc", header: "Função" },
  { accessorKey: "gfcdLider",  header: "Líder GFCD?", cell: ({ row }) => (row.getValue("gfcdLider") ? "Sim" : "Não") },
  { accessorKey: "dtBatismo", header: "Batismo" },
  { accessorKey: "batizado", header: "Batizado?", cell: ({ row }) => (row.getValue("batizado") ? "Sim" : "Não") },
  { accessorKey: "igrejaBatizado", header: "Igreja Batismo" }, { accessorKey: "dtAdmissao", header: "Admissão" },
  { accessorKey: "tipoAdmissao", header: "Tipo Admissão" }, { accessorKey: "dtConversao", header: "Data Extra" },
  { accessorKey: "gfcdFrequentado", header: "GFCD" }, { accessorKey: "gfcdConsolidado", header: "Consolidado por" },
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
  const router = useRouter();
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
    <main className="text-[#350700] container mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
        <div className="w-full flex justify-end mb-4">
          <Button onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/login"); 
            }}>
            Sair
            <Image src={Logout} alt="Imagem de sair" className="w-5 h-5"/>
          </Button>
        </div>
        
        <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">TABELA MEMBROS/CONGREGADOS</h2>
        <p className="mb-4 text-center text-gray-500">Aqui estão os membros e congregados registrados.</p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="w-full max-w-[600px]"
        />

        <Button id="btn-report" onClick={() => {
          const rows = table.getRowModel().rows.map((row) => row.original);
          exportTableToExcel(rows, "relatorio_membros");
        }}  className="w-full sm:w-auto">
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
    </main>
  )
}

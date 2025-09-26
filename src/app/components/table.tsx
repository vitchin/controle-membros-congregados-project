"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

// Definição do tipo User localmente, já que a API foi removida
export type User = {
  id: string;
  nome: string;
  email: string;
  dtNascimento: string;
  sexo: string;
  estadoCivil: string;
};

// Dados estáticos para a tabela
const staticData: User[] = [
  { id: "1", nome: "João da Silva", email: "joao.silva@example.com", dtNascimento: "1990-01-15", sexo: "Masculino", estadoCivil: "Solteiro" },
  { id: "2", nome: "Maria Oliveira", email: "maria.oliveira@example.com", dtNascimento: "1985-05-20", sexo: "Feminino", estadoCivil: "Casada" },
  { id: "3", nome: "Carlos Pereira", email: "carlos.pereira@example.com", dtNascimento: "1992-09-10", sexo: "Masculino", estadoCivil: "Solteiro" },
];

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};

export function TabelaPessoas() {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [people] = React.useState<User[]>(staticData); // Usa os dados estáticos

  const editarPessoa = React.useCallback((person: User) => {
    router.push(`/register/${person.id}`);
  }, [router]);

  const columns: ColumnDef<User>[] = React.useMemo(() => [
    { accessorKey: "nome", header: "Nome" },
    { accessorKey: "sexo", header: "Sexo" },
    {
      accessorKey: "dtNascimento",
      header: "Data Nascimento",
      cell: ({ row }) => formatDate(row.getValue("dtNascimento")),
    },
    { accessorKey: "estadoCivil", header: "Estado Civil" },
    { accessorKey: "email", header: "Email" },
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
            <DropdownMenuItem onClick={() => editarPessoa(row.original)}>
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [editarPessoa]);

  const table = useReactTable({
    data: people,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <main className="text-[#350700] container mx-auto my-10 px-5 py-8 bg-white border-1 border-solid border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        TABELA MEMBROS/CONGREGADOS
      </h2>
      <p className="mb-4 text-center text-gray-500">
        Aqui estão os membros e congregados registrados.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="w-full max-w-[600px]"
        />
        <Button
          id="btn-add"
          onClick={() => router.push("/register")}
          className="w-full sm:w-auto" variant="secondary">
          ADICIONAR PESSOAS
        </Button>
      </div>

      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[800px] text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap px-2 py-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                    <TableCell key={cell.id} className="whitespace-nowrap px-2 py-1 max-w-[200px] truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-left">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
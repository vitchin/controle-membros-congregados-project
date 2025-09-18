"use client";

import { exportTableToExcel } from "@/utils/exportExcel";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import Logout from "../../../public/logout.svg";
import * as React from "react";
import { ColumnDef,ColumnFiltersState,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,useReactTable } from "@tanstack/react-table";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { DeleteUserDialog } from "./deleteUserDialog";
import { User } from "@/app/api/users/db";

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

export function TabelaPessoas() {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [people, setPeople] = React.useState<User[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [personToDelete, setPersonToDelete] = React.useState<User | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [reportColumns, setReportColumns] = React.useState<Record<keyof User, boolean>>({} as Record<keyof User, boolean>);
  const [reportFilename, setReportFilename] = React.useState("relatorio_membros");

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setPeople(data);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteConfirm = async (motivo: string, outrosMotivo?: string) => {
    if (personToDelete) {
      await fetch(`/api/users/${personToDelete.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataExclusao: new Date().toISOString(),
          motivoExclusao: motivo,
          outrosMotivoExclusao: outrosMotivo,
        }),
      });
      setIsDeleteDialogOpen(false);
      setPersonToDelete(null);
      fetchUsers(); // Refresh table
    }
  };

  const editarPessoa = React.useCallback((person: User) => {
    router.push(`/register/${person.id}`);
  }, [router]);

  // dentro do componente, ajuste a função gerarRelatorio
  const gerarRelatorio = React.useCallback(() => {
    const selectedColumns = (Object.keys(reportColumns) as Array<keyof User>)
      .filter(col => reportColumns[col]);

    const filteredData = people.map(person =>
      pick(person, selectedColumns)
    );

    exportTableToExcel(filteredData, reportFilename);
    setIsReportModalOpen(false);
  }, [people, reportColumns, reportFilename]);

  const columns: ColumnDef<User>[] = React.useMemo(() => [
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
    { accessorKey: "gfcdFrequentado", header: "GFCD" }, { accessorKey: "gfcdConsolidado", header: "Consolidado?", cell: ({ row }) => (row.getValue("gfcdConsolidado") ? "Sim" : "Não") },
    { accessorKey: "retiro", header: "Encontro" },
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
            <DropdownMenuItem
              onClick={() => {
                setPersonToDelete(row.original);
                setIsDeleteDialogOpen(true);
              }}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [editarPessoa]);

  // Type guard para colunas com accessorKey
  function hasAccessorKey(
    col: ColumnDef<User>
  ): col is ColumnDef<User> & { accessorKey: keyof User } {
    return "accessorKey" in col && typeof col.accessorKey === "string";
  }

  React.useEffect(() => {
    // Inicializa reportColumns apenas com accessorKey que são chaves de User
    const initialColumns = columns
      .filter(hasAccessorKey)
      .reduce(
        (acc, col) => ({ ...acc, [col.accessorKey]: true }),
        {} as Record<keyof User, boolean>
      );
    setReportColumns(initialColumns);
  }, [columns]);

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
      <div className="w-full flex justify-end mb-4">
        <Button onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/login");
          }}>
          Sair
          <Image src={Logout} alt="Imagem de sair" className="w-5 h-5" />
        </Button>
      </div>

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
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            id="btn-add"
            onClick={() => router.push("/register")}
            className="w-full sm:w-auto" variant="secondary">
            ADICIONAR PESSOAS
          </Button>
          <Button
            id="btn-report"
            onClick={() => setIsReportModalOpen(true)}
            className="w-full sm:w-auto" variant="default">
            GERAR RELATÓRIO EXCEL
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[1200px] text-sm">
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

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        user={personToDelete}
      />

      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Gerar Relatório Excel</DialogTitle>
            <DialogDescription>
              Selecione as colunas que deseja incluir no relatório e defina o nome do arquivo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {columns
                .filter(hasAccessorKey)
                .map((column) => {
                  const accessorKey = column.accessorKey;
                  return (
                    <div key={accessorKey} className="flex items-center space-x-2">
                      <Checkbox
                        id={String(accessorKey)}
                        checked={reportColumns[accessorKey]}
                        onCheckedChange={(checked) =>
                          setReportColumns(prev => ({ ...prev, [accessorKey]: !!checked }))
                        }
                      />
                      <Label htmlFor={String(accessorKey)} className="capitalize">
                        {String(column.header)}
                      </Label>
                    </div>
                  );
                })}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="filename" className="text-right">
                Nome do Arquivo
              </Label>
              <Input
                id="filename"
                value={reportFilename}
                onChange={(e) => setReportFilename(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsReportModalOpen(false)}>
              CANCELAR
            </Button>
            <Button onClick={gerarRelatorio} variant="default">GERAR RELATÓRIO</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

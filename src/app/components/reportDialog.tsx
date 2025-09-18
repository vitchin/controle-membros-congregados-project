"use client";

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/app/api/users/db';

interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnDef<User>[];
  reportColumns: Record<keyof User, boolean>;
  setReportColumns: React.Dispatch<React.SetStateAction<Record<keyof User, boolean>>>;
  reportFilename: string;
  setReportFilename: (value: string) => void;
  gerarRelatorio: () => void;
}

// Type guard para colunas com accessorKey
function hasAccessorKey(col: ColumnDef<User>): col is ColumnDef<User> & { accessorKey: keyof User } {
  return "accessorKey" in col && typeof col.accessorKey === "string";
}

export function ReportDialog({
  isOpen,
  onClose,
  columns,
  reportColumns,
  setReportColumns,
  reportFilename,
  setReportFilename,
  gerarRelatorio
}: ReportDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <Button variant="secondary" onClick={onClose}>
            CANCELAR
          </Button>
          <Button onClick={gerarRelatorio} variant="default">GERAR RELATÓRIO</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

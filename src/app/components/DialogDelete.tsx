"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { User } from "@/types/user";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (motivo: string, outrosMotivo?: string) => void;
  user: User | null;
}

export function DeleteUserDialog({ isOpen, onClose, onConfirm, user }: DeleteUserDialogProps) {
  const [motivo, setMotivo] = useState('');
  const [outrosMotivo, setOutrosMotivo] = useState('');
  const [showOutros, setShowOutros] = useState(false);

  const handleMotivoChange = (value: string) => {
    setMotivo(value);
    setShowOutros(value === 'Outros');
  };

  const handleConfirm = () => {
    onConfirm(motivo, outrosMotivo);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Usuário</DialogTitle>
          <DialogDescription>
            Você está prestes a marcar o usuário <strong>{user?.nome}</strong> como excluído. Por favor, informe o motivo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="motivo" className="text-right">
              Motivo
            </Label>
            <Select onValueChange={handleMotivoChange} value={motivo}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morte">Morte</SelectItem>
                <SelectItem value="Transferência">Transferência</SelectItem>
                <SelectItem value="Afastamento">Afastamento</SelectItem>
                <SelectItem value="Mudança de endereço">Mudança de endereço</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {showOutros && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="outrosMotivo" className="text-right">
                Outros
              </Label>
              <Input
                id="outrosMotivo"
                value={outrosMotivo}
                onChange={(e) => setOutrosMotivo(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

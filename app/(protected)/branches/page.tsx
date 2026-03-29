"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Users } from "lucide-react";
import Link from "next/link";

interface Branch {
  id: string;
  name: string;
  employeeCount: number;
}

const MOCK_BRANCHES: Branch[] = [
  { id: "1", name: "Filial São Paulo", employeeCount: 12 },
  { id: "2", name: "Filial Rio de Janeiro", employeeCount: 8 },
  { id: "3", name: "Filial Belo Horizonte", employeeCount: 5 },
];

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(MOCK_BRANCHES);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function createBranch() {
    if (!newName.trim()) return;
    setBranches([
      ...branches,
      { id: String(Date.now()), name: newName, employeeCount: 0 },
    ]);
    setNewName("");
    setDialogOpen(false);
  }

  function renameBranch(id: string) {
    if (!editName.trim()) return;
    setBranches(
      branches.map((b) => (b.id === id ? { ...b, name: editName } : b))
    );
    setEditingId(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Filiais</h1>
          <p className="text-muted-foreground">
            Gerencie as filiais da sua empresa
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Filial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Filial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Filial</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Filial São Paulo"
                />
              </div>
              <Button onClick={createBranch} className="w-full">
                Criar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Filiais</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    {editingId === branch.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8"
                        />
                        <Button
                          size="sm"
                          onClick={() => renameBranch(branch.id)}
                        >
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium">{branch.name}</span>
                    )}
                  </TableCell>
                  <TableCell>{branch.employeeCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(branch.id);
                          setEditName(branch.name);
                        }}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Renomear
                      </Button>
                      <Link href={`/branches/${branch.id}/employees`}>
                        <Button variant="ghost" size="sm">
                          <Users className="w-4 h-4 mr-1" />
                          Funcionários
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

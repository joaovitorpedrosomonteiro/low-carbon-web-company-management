"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Employee {
  id: string;
  email: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: "1", email: "joao@empresa.com" },
  { id: "2", email: "maria@empresa.com" },
  { id: "3", email: "pedro@empresa.com" },
];

export default function EmployeesPage() {
  const params = useParams();
  const branchId = params.branchId as string;
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [newEmail, setNewEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function createEmployee() {
    if (!newEmail.trim()) return;
    setEmployees([
      ...employees,
      { id: String(Date.now()), email: newEmail },
    ]);
    setNewEmail("");
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/branches">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Funcionários</h1>
          <p className="text-muted-foreground">
            Gerencie os funcionários da filial
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Funcionário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="funcionario@email.com"
                />
              </div>
              <Button onClick={createEmployee} className="w-full">
                Criar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Remover
                    </Button>
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

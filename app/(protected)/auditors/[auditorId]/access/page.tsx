"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

interface AccessGrant {
  id: string;
  scope: string;
  resourceName: string;
  grantedAt: string;
}

const MOCK_GRANTS: AccessGrant[] = [
  { id: "1", scope: "company_branch", resourceName: "Filial São Paulo", grantedAt: "2026-01-15" },
  { id: "2", scope: "single_inventory", resourceName: "Inventário Jan/2026 - SP", grantedAt: "2026-02-01" },
];

const SCOPE_LABELS: Record<string, string> = {
  single_inventory: "Inventário Único",
  company_branch: "Filial Inteira",
  company: "Empresa Inteira",
};

export default function AuditorAccessPage() {
  const params = useParams();
  const auditorId = params.auditorId as string;
  const [grants, setGrants] = useState<AccessGrant[]>(MOCK_GRANTS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scope, setScope] = useState("");

  function revokeGrant(id: string) {
    setGrants(grants.filter((g) => g.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/auditors">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Gerenciar Acessos</h1>
          <p className="text-muted-foreground">
            Conceda ou revogue acessos do auditor
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Conceder Acesso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conceder Acesso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Escopo</label>
                <Select value={scope} onValueChange={setScope}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o escopo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single_inventory">Inventário Único</SelectItem>
                    <SelectItem value="company_branch">Filial Inteira</SelectItem>
                    <SelectItem value="company">Empresa Inteira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setDialogOpen(false)}>
                Conceder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acessos Concedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {grants.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum acesso concedido
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Escopo</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>Concedido em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grants.map((grant) => (
                  <TableRow key={grant.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {SCOPE_LABELS[grant.scope] || grant.scope}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {grant.resourceName}
                    </TableCell>
                    <TableCell>{grant.grantedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revokeGrant(grant.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1 text-red-500" />
                        Revogar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

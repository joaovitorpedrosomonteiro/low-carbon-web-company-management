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
import { Badge } from "@/components/ui/badge";
import { Plus, Shield } from "lucide-react";
import Link from "next/link";

interface Auditor {
  id: string;
  email: string;
  certificateSerial: string;
  accessCount: number;
}

const MOCK_AUDITORS: Auditor[] = [
  { id: "1", email: "auditor1@firma.com", certificateSerial: "ABC123", accessCount: 3 },
  { id: "2", email: "auditor2@firma.com", certificateSerial: "DEF456", accessCount: 1 },
];

export default function AuditorsPage() {
  const [auditors, setAuditors] = useState<Auditor[]>(MOCK_AUDITORS);
  const [newEmail, setNewEmail] = useState("");
  const [newCert, setNewCert] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  function createAuditor() {
    if (!newEmail.trim() || !newCert.trim()) return;
    setAuditors([
      ...auditors,
      { id: String(Date.now()), email: newEmail, certificateSerial: "NEW", accessCount: 0 },
    ]);
    setNewEmail("");
    setNewCert("");
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Auditores</h1>
          <p className="text-muted-foreground">
            Gerencie os auditores e seus acessos
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Auditor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Auditor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="auditor@firma.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Certificado ICP-Brasil (PEM)</label>
                <textarea
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="-----BEGIN CERTIFICATE-----"
                  className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <Button onClick={createAuditor} className="w-full">
                Criar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Auditores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Certificado</TableHead>
                <TableHead>Acessos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditors.map((auditor) => (
                <TableRow key={auditor.id}>
                  <TableCell className="font-medium">{auditor.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{auditor.certificateSerial}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={auditor.accessCount > 0 ? "success" : "secondary"}>
                      {auditor.accessCount} acesso(s)
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/auditors/${auditor.id}/access`}>
                      <Button variant="ghost" size="sm">
                        <Shield className="w-4 h-4 mr-1" />
                        Gerenciar Acesso
                      </Button>
                    </Link>
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

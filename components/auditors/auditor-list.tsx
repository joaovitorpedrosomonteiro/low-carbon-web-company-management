"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface Auditor {
  id: string;
  email: string;
  certificateSerial: string;
}

interface AuditorListProps {
  auditors: Auditor[];
}

export function AuditorList({ auditors }: AuditorListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Certificado</TableHead>
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
            <TableCell className="text-right">
              <Link href={`/auditors/${auditor.id}/access`}>
                <Button variant="ghost" size="sm">
                  <Shield className="w-4 h-4 mr-1" />
                  Acessos
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

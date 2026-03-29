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
import { Pencil, Users } from "lucide-react";

interface Branch {
  id: string;
  name: string;
}

interface BranchListProps {
  branches: Branch[];
  onRename?: (id: string, name: string) => void;
}

export function BranchList({ branches, onRename }: BranchListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell className="font-medium">{branch.name}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                {onRename && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRename(branch.id, branch.name)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Renomear
                  </Button>
                )}
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
  );
}

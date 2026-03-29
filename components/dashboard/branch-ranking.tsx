"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BranchRankingItem } from "@/lib/api/dashboard";

interface BranchRankingProps {
  branches: BranchRankingItem[];
}

export function BranchRanking({ branches }: BranchRankingProps) {
  if (branches.length === 0) return null;

  const maxTco2e = Math.max(...branches.map((b) => b.tco2e));
  const minTco2e = Math.min(...branches.map((b) => b.tco2e));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking de Filiais</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Filial</TableHead>
              <TableHead className="text-right">tCO2e</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.map((branch) => {
              const isHighest = branch.tco2e === maxTco2e;
              const isLowest = branch.tco2e === minTco2e && branches.length > 1;
              return (
                <TableRow
                  key={branch.branchId}
                  className={
                    isHighest
                      ? "bg-red-50"
                      : isLowest
                      ? "bg-green-50"
                      : ""
                  }
                >
                  <TableCell className="font-bold">{branch.rank}</TableCell>
                  <TableCell className="font-medium">
                    {branch.branchName}
                    {isHighest && (
                      <span className="ml-2 text-xs text-red-600 font-medium">
                        ↑ Maior emissor
                      </span>
                    )}
                    {isLowest && (
                      <span className="ml-2 text-xs text-green-600 font-medium">
                        ↓ Menor emissor
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {branch.tco2e.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

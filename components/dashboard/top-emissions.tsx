"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TopEmissionItem } from "@/lib/api/dashboard";

interface TopEmissionsProps {
  emissions: TopEmissionItem[];
}

export function TopEmissions({ emissions }: TopEmissionsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Emissão</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Escopo</TableHead>
          <TableHead className="text-right">tCO2e</TableHead>
          <TableHead className="text-right">% do Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emissions.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <span className="text-muted-foreground mr-2">{index + 1}.</span>
              {item.emissionName}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {item.categoryName}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.scope === "Escopo 1"
                    ? "bg-green-100 text-green-800"
                    : item.scope === "Escopo 2"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {item.scope}
              </span>
            </TableCell>
            <TableCell className="text-right font-mono">
              {item.tco2e.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              {item.percentage.toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

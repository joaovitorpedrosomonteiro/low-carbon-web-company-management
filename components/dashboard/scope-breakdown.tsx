"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "@/components/charts/pie-chart";
import type { ScopeBreakdownItem } from "@/lib/api/dashboard";

interface ScopeBreakdownProps {
  data: ScopeBreakdownItem[];
}

const SCOPE_COLORS: Record<string, string> = {
  "Escopo 1": "#22c55e",
  "Escopo 2": "#3b82f6",
  "Escopo 3": "#f59e0b",
};

export function ScopeBreakdown({ data }: ScopeBreakdownProps) {
  const pieData = data.map((item) => ({
    name: item.scope,
    value: item.tco2e,
    fill: SCOPE_COLORS[item.scope] || "#94a3b8",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Escopo</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart data={pieData} />
        <div className="mt-4 space-y-2">
          {data.map((scope) => (
            <div key={scope.scope} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{scope.scope}</span>
                <span className="text-muted-foreground">
                  {scope.tco2e.toFixed(2)} tCO2e ({scope.percentage.toFixed(1)}%)
                </span>
              </div>
              {scope.categories.length > 0 && (
                <div className="pl-4 space-y-1">
                  {scope.categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between text-xs text-muted-foreground"
                    >
                      <span>{cat.name}</span>
                      <span>{cat.tco2e.toFixed(2)} tCO2e</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

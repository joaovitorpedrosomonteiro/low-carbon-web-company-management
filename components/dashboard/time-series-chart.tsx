"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import type { TimeSeriesPoint } from "@/lib/api/dashboard";

interface TimeSeriesChartProps {
  data: TimeSeriesPoint[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emissões ao Longo do Tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={data}
          xKey="month"
          lines={[
            { key: "tco2e", color: "#22c55e", name: "tCO2e (Atual)" },
            { key: "prevYearTco2e", color: "#94a3b8", name: "tCO2e (Ano Anterior)" },
          ]}
        />
      </CardContent>
    </Card>
  );
}

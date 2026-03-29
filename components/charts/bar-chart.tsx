"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface BarChartProps {
  data: any[];
  horizontal?: boolean;
  showReferenceLine?: boolean;
  bars?: { key: string; color: string; name: string }[];
  height?: number;
}

const DEFAULT_BARS = [{ key: "value", color: "#22c55e", name: "Valor" }];

export function BarChart({
  data,
  horizontal = false,
  showReferenceLine = false,
  bars = DEFAULT_BARS,
  height = 300,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {horizontal ? (
          <>
            <XAxis type="number" fontSize={12} />
            <YAxis dataKey="name" type="category" fontSize={11} width={150} />
          </>
        ) : (
          <>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
          </>
        )}
        <Tooltip />
        <Legend />
        {bars.map((bar) => (
          <Bar key={bar.key} dataKey={bar.key} fill={bar.color} name={bar.name} />
        ))}
        {showReferenceLine && (
          <Bar dataKey="reference" fill="#94a3b8" name="Média do Setor" />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

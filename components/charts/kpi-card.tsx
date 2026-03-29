"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  delta?: number;
  deltaLabel?: string;
}

export function KpiCard({ title, value, subtitle, delta, deltaLabel }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {delta !== undefined && (
          <div
            className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              delta < 0
                ? "text-green-600"
                : delta > 0
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            <span>{delta < 0 ? "↓" : delta > 0 ? "↑" : "→"}</span>
            <span>
              {Math.abs(delta).toFixed(1)}% {deltaLabel || "vs. ano anterior"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

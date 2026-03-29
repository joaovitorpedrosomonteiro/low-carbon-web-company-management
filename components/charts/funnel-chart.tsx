"use client";

import { Card } from "@/components/ui/card";

interface FunnelChartProps {
  data: { name: string; value: number; fill: string }[];
}

export function FunnelChart({ data }: FunnelChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const widthPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
        return (
          <div key={item.name} className="flex items-center gap-4">
            <div className="w-40 text-sm text-right font-medium">
              {item.name}
            </div>
            <div className="flex-1 relative">
              <div className="h-10 rounded-md bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-md transition-all duration-500 flex items-center justify-end pr-3"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.fill,
                    minWidth: item.value > 0 ? "40px" : "0",
                  }}
                >
                  {item.value > 0 && (
                    <span className="text-white text-sm font-bold">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-16 text-sm text-muted-foreground">
              {maxValue > 0 ? `${((item.value / maxValue) * 100).toFixed(0)}%` : "0%"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MissingDataItem } from "@/lib/api/dashboard";
import { useState } from "react";

interface MissingDataAlertsProps {
  alerts: MissingDataItem[];
}

export function MissingDataAlerts({ alerts }: MissingDataAlertsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visibleAlerts = alerts.filter((a) => !dismissed.has(a.inventoryId));

  if (visibleAlerts.length === 0) return null;

  function dismiss(id: string) {
    setDismissed((prev) => {
      const next = new Set(Array.from(prev));
      next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
        <h3 className="font-semibold text-amber-800">
          Dados Faltantes ({visibleAlerts.length})
        </h3>
      </div>
      <div className="space-y-2">
        {visibleAlerts.map((alert) => (
          <div
            key={alert.inventoryId}
            className="flex items-center justify-between bg-white rounded-md p-3 border border-amber-100"
          >
            <div>
              <p className="text-sm font-medium">{alert.inventoryName}</p>
              <p className="text-xs text-muted-foreground">
                {alert.branchName} — {alert.missingVariableCount} variável(is) faltante(s)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Preencher
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => dismiss(alert.inventoryId)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

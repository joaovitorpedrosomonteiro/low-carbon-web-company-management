"use client";

import { KpiCard } from "@/components/charts/kpi-card";
import { formatNumber } from "@/lib/utils";

interface SummaryCardsProps {
  totalTCO2e: number;
  inventoryCount: number;
  auditedCount: number;
  pendingCount: number;
  yoyDelta: number;
  inventoryDelta: number;
}

export function SummaryCards({
  totalTCO2e,
  inventoryCount,
  auditedCount,
  pendingCount,
  yoyDelta,
  inventoryDelta,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="Emissões Totais"
        value={`${formatNumber(totalTCO2e)} tCO2e`}
        subtitle="Período selecionado"
        delta={yoyDelta}
      />
      <KpiCard
        title="Total de Inventários"
        value={String(inventoryCount)}
        subtitle="Inventários no período"
        delta={inventoryDelta}
        deltaLabel="vs. ano anterior"
      />
      <KpiCard
        title="Auditados"
        value={String(auditedCount)}
        subtitle={`${inventoryCount > 0 ? ((auditedCount / inventoryCount) * 100).toFixed(0) : 0}% do total`}
      />
      <KpiCard
        title="Pendentes"
        value={String(pendingCount)}
        subtitle="Aguardando processamento"
      />
    </div>
  );
}

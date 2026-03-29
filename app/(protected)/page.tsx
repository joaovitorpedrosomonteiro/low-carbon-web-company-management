"use client";

import { useState } from "react";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { TimeSeriesChart } from "@/components/dashboard/time-series-chart";
import { ScopeBreakdown } from "@/components/dashboard/scope-breakdown";
import { BranchRanking } from "@/components/dashboard/branch-ranking";
import { TopEmissions } from "@/components/dashboard/top-emissions";
import { MissingDataAlerts } from "@/components/dashboard/missing-data-alerts";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { KpiCard } from "@/components/charts/kpi-card";
import { BarChart } from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDashboard,
  useTimeSeries,
  useScopeBreakdown,
  useBranchRanking,
  useTopEmissions,
  useMissingData,
  useFunnelData,
  useAuditCycleTime,
  useBenchmarkData,
  useInventoryList,
} from "@/lib/hooks/use-dashboard";
import { Download, FileText, FileSpreadsheet } from "lucide-react";

export default function DashboardPage() {
  const [auditedOnly, setAuditedOnly] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: summary } = useDashboard(auditedOnly, selectedYear);
  const { data: timeSeries } = useTimeSeries(auditedOnly, selectedYear);
  const { data: scopeData } = useScopeBreakdown(auditedOnly, selectedYear);
  const { data: branches } = useBranchRanking(auditedOnly, selectedYear);
  const { data: topEmissions } = useTopEmissions(auditedOnly, selectedYear);
  const { data: missingData } = useMissingData();
  const { data: funnel } = useFunnelData(auditedOnly);
  const { data: auditCycle } = useAuditCycleTime();
  const { data: benchmarks } = useBenchmarkData(auditedOnly, selectedYear);
  const { data: inventoryList } = useInventoryList(auditedOnly, selectedYear);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do inventário de emissões
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Todos</span>
            <Switch
              checked={auditedOnly}
              onCheckedChange={setAuditedOnly}
            />
            <span className="text-sm">Somente Auditados</span>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded-md px-3 py-1.5 text-sm"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      <SummaryCards
        totalTCO2e={summary?.totalTCO2e ?? 0}
        inventoryCount={summary?.inventoryCount ?? 0}
        auditedCount={summary?.auditedCount ?? 0}
        pendingCount={summary?.pendingCount ?? 0}
        yoyDelta={summary?.yoyDelta ?? 0}
        inventoryDelta={summary?.inventoryDelta ?? 0}
      />

      {missingData && missingData.length > 0 && (
        <MissingDataAlerts alerts={missingData} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart data={timeSeries ?? []} />
        <ScopeBreakdown data={scopeData ?? []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BranchRanking branches={branches ?? []} />
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top 10 Fontes de Emissão</CardTitle>
          </CardHeader>
          <CardContent>
            <TopEmissions emissions={topEmissions ?? []} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KpiCard
          title="Tempo Médio de Auditoria"
          value={`${auditCycle?.avgDays ?? 0} dias`}
          subtitle="Média de dias para auditar"
        />
        <KpiCard
          title="Inventários em Funil"
          value={String(funnel?.total ?? 0)}
          subtitle="Total no pipeline"
        />
        <KpiCard
          title="Benchmark do Setor"
          value={`${benchmarks?.length ?? 0} categorias`}
          subtitle="Categorias comparadas"
        />
      </div>

      {funnel && (
        <Card>
          <CardHeader>
            <CardTitle>Funil de Conclusão de Inventários</CardTitle>
          </CardHeader>
          <CardContent>
            <FunnelChart
              data={[
                { name: "A Reportar", value: funnel.toReportEmissions, fill: "#94a3b8" },
                { name: "A Fornecer Evidência", value: funnel.toProvideEvidence, fill: "#60a5fa" },
                { name: "Em Auditoria", value: funnel.forAuditing, fill: "#fbbf24" },
                { name: "Em Revisão", value: funnel.forReview, fill: "#f97316" },
                { name: "Auditado", value: funnel.audited, fill: "#22c55e" },
              ]}
            />
          </CardContent>
        </Card>
      )}

      {benchmarks && benchmarks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Benchmarks de Fatores de Emissão</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={benchmarks.map((b) => ({
                name: b.categoryName,
                value: b.companyValue,
                reference: b.sectorAverage,
              }))}
              horizontal
              showReferenceLine
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inventários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Filial</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">tCO2e</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(inventoryList ?? []).map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.name}</TableCell>
                  <TableCell>{inv.branchName}</TableCell>
                  <TableCell>{inv.period}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inv.state === "audited"
                          ? "bg-green-100 text-green-800"
                          : inv.state === "for_review"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {inv.state}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {inv.tco2e.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

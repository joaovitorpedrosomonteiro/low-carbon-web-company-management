import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardSummary,
  fetchTimeSeries,
  fetchScopeBreakdown,
  fetchBranchRanking,
  fetchTopEmissions,
  fetchMissingData,
  fetchFunnelData,
  fetchAuditCycleTime,
  fetchBenchmarkData,
  fetchInventoryList,
} from "@/lib/api/dashboard";

const MOCK_SUMMARY = {
  totalTCO2e: 12450.75,
  inventoryCount: 48,
  auditedCount: 32,
  pendingCount: 16,
  yoyDelta: -8.3,
  inventoryDelta: 12.5,
};

const MOCK_TIME_SERIES = [
  { month: "Jan", tco2e: 1050, prevYearTco2e: 1120 },
  { month: "Fev", tco2e: 980, prevYearTco2e: 1050 },
  { month: "Mar", tco2e: 1100, prevYearTco2e: 1180 },
  { month: "Abr", tco2e: 1020, prevYearTco2e: 1100 },
  { month: "Mai", tco2e: 950, prevYearTco2e: 1080 },
  { month: "Jun", tco2e: 1080, prevYearTco2e: 1150 },
  { month: "Jul", tco2e: 1000, prevYearTco2e: 1090 },
  { month: "Ago", tco2e: 1060, prevYearTco2e: 1130 },
  { month: "Set", tco2e: 990, prevYearTco2e: 1070 },
  { month: "Out", tco2e: 1110, prevYearTco2e: 1200 },
  { month: "Nov", tco2e: 1040, prevYearTco2e: 1110 },
  { month: "Dez", tco2e: 1070, prevYearTco2e: 1140 },
];

const MOCK_SCOPE_DATA = [
  {
    scope: "Escopo 1",
    tco2e: 4200,
    percentage: 33.7,
    categories: [
      { name: "Combustão Estacionária", tco2e: 2100 },
      { name: "Combustão Móvel", tco2e: 1500 },
      { name: "Processos Industriais", tco2e: 400 },
      { name: "Fugitivas", tco2e: 200 },
    ],
  },
  {
    scope: "Escopo 2",
    tco2e: 3800,
    percentage: 30.5,
    categories: [
      { name: "Energia Elétrica Comprada", tco2e: 3200 },
      { name: "Energia Térmica Comprada", tco2e: 600 },
    ],
  },
  {
    scope: "Escopo 3",
    tco2e: 4450,
    percentage: 35.8,
    categories: [
      { name: "Transporte e Distribuição", tco2e: 1800 },
      { name: "Resíduos Gerados", tco2e: 900 },
      { name: "Viagens a Negócios", tco2e: 750 },
      { name: "Deslocamento de Funcionários", tco2e: 600 },
      { name: "Uso de Produtos Vendidos", tco2e: 400 },
    ],
  },
];

const MOCK_BRANCHES = [
  { branchId: "1", branchName: "Filial São Paulo", tco2e: 5200, rank: 1 },
  { branchId: "2", branchName: "Filial Rio de Janeiro", tco2e: 3100, rank: 2 },
  { branchId: "3", branchName: "Filial Belo Horizonte", tco2e: 2350, rank: 3 },
  { branchId: "4", branchName: "Filial Curitiba", tco2e: 1800, rank: 4 },
];

const MOCK_TOP_EMISSIONS = [
  { id: "1", emissionName: "Combustão Gerador Diesel", categoryName: "Combustão Estacionária", scope: "Escopo 1", tco2e: 1850, percentage: 14.9, inventoryId: "inv-1" },
  { id: "2", emissionName: "Consumo Energia Elétrica", categoryName: "Energia Elétrica Comprada", scope: "Escopo 2", tco2e: 1650, percentage: 13.3, inventoryId: "inv-2" },
  { id: "3", emissionName: "Frota Veículos Leves", categoryName: "Combustão Móvel", scope: "Escopo 1", tco2e: 1200, percentage: 9.6, inventoryId: "inv-1" },
  { id: "4", emissionName: "Frete Rodoviário", categoryName: "Transporte e Distribuição", scope: "Escopo 3", tco2e: 980, percentage: 7.9, inventoryId: "inv-3" },
  { id: "5", emissionName: "Resíduos Sólidos", categoryName: "Resíduos Gerados", scope: "Escopo 3", tco2e: 750, percentage: 6.0, inventoryId: "inv-2" },
  { id: "6", emissionName: "Viagens Aéreas", categoryName: "Viagens a Negócios", scope: "Escopo 3", tco2e: 620, percentage: 5.0, inventoryId: "inv-4" },
  { id: "7", emissionName: "Gás Natural Aquecimento", categoryName: "Combustão Estacionária", scope: "Escopo 1", tco2e: 550, percentage: 4.4, inventoryId: "inv-1" },
  { id: "8", emissionName: "Ar Condicionado", categoryName: "Fugitivas", scope: "Escopo 1", tco2e: 480, percentage: 3.9, inventoryId: "inv-3" },
  { id: "9", emissionName: "Energia Térmica", categoryName: "Energia Térmica Comprada", scope: "Escopo 2", tco2e: 420, percentage: 3.4, inventoryId: "inv-2" },
  { id: "10", emissionName: "Deslocamento Colaboradores", categoryName: "Deslocamento de Funcionários", scope: "Escopo 3", tco2e: 380, percentage: 3.1, inventoryId: "inv-4" },
];

const MOCK_MISSING_DATA = [
  { inventoryId: "inv-5", inventoryName: "Planta SP - Março/2026", branchName: "Filial São Paulo", missingVariableCount: 3 },
  { inventoryId: "inv-6", inventoryName: "Escritório RJ - Março/2026", branchName: "Filial Rio de Janeiro", missingVariableCount: 7 },
];

const MOCK_FUNNEL = {
  total: 48,
  toReportEmissions: 5,
  toProvideEvidence: 6,
  forAuditing: 3,
  forReview: 2,
  audited: 32,
};

const MOCK_AUDIT_CYCLE = {
  avgDays: 12.5,
  byAuditor: [
    { auditorName: "João Auditor", avgDays: 10 },
    { auditorName: "Maria Auditor", avgDays: 15 },
  ],
};

const MOCK_BENCHMARKS = [
  { categoryName: "Combustão Estacionária", companyValue: 2100, sectorAverage: 1800 },
  { categoryName: "Combustão Móvel", companyValue: 1500, sectorAverage: 1600 },
  { categoryName: "Energia Elétrica Comprada", companyValue: 3200, sectorAverage: 3500 },
  { categoryName: "Transporte e Distribuição", companyValue: 1800, sectorAverage: 2000 },
  { categoryName: "Resíduos Gerados", companyValue: 900, sectorAverage: 750 },
];

const MOCK_INVENTORIES = [
  { id: "inv-1", name: "Planta Industrial - Jan/2026", branchName: "Filial São Paulo", period: "Janeiro/2026", state: "audited", tco2e: 1050 },
  { id: "inv-2", name: "Escritório Central - Jan/2026", branchName: "Filial Rio de Janeiro", period: "Janeiro/2026", state: "audited", tco2e: 820 },
  { id: "inv-3", name: "Planta Industrial - Fev/2026", branchName: "Filial São Paulo", period: "Fevereiro/2026", state: "for_auditing", tco2e: 980 },
  { id: "inv-4", name: "Escritório Central - Fev/2026", branchName: "Filial Rio de Janeiro", period: "Fevereiro/2026", state: "to_provide_evidence", tco2e: 750 },
  { id: "inv-5", name: "Planta Industrial - Mar/2026", branchName: "Filial São Paulo", period: "Março/2026", state: "to_report_emissions", tco2e: 0 },
];

export function useDashboard(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "summary", auditedOnly, year],
    queryFn: () => fetchDashboardSummary(auditedOnly, year),
    placeholderData: MOCK_SUMMARY,
  });
}

export function useTimeSeries(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "time-series", auditedOnly, year],
    queryFn: () => fetchTimeSeries(auditedOnly, year),
    placeholderData: MOCK_TIME_SERIES,
  });
}

export function useScopeBreakdown(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "scope-breakdown", auditedOnly, year],
    queryFn: () => fetchScopeBreakdown(auditedOnly, year),
    placeholderData: MOCK_SCOPE_DATA,
  });
}

export function useBranchRanking(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "branch-ranking", auditedOnly, year],
    queryFn: () => fetchBranchRanking(auditedOnly, year),
    placeholderData: MOCK_BRANCHES,
  });
}

export function useTopEmissions(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "top-emissions", auditedOnly, year],
    queryFn: () => fetchTopEmissions(auditedOnly, year),
    placeholderData: MOCK_TOP_EMISSIONS,
  });
}

export function useMissingData() {
  return useQuery({
    queryKey: ["dashboard", "missing-data"],
    queryFn: fetchMissingData,
    placeholderData: MOCK_MISSING_DATA,
  });
}

export function useFunnelData(auditedOnly: boolean) {
  return useQuery({
    queryKey: ["dashboard", "funnel", auditedOnly],
    queryFn: () => fetchFunnelData(auditedOnly),
    placeholderData: MOCK_FUNNEL,
  });
}

export function useAuditCycleTime() {
  return useQuery({
    queryKey: ["dashboard", "audit-cycle-time"],
    queryFn: fetchAuditCycleTime,
    placeholderData: MOCK_AUDIT_CYCLE,
  });
}

export function useBenchmarkData(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "benchmarks", auditedOnly, year],
    queryFn: () => fetchBenchmarkData(auditedOnly, year),
    placeholderData: MOCK_BENCHMARKS,
  });
}

export function useInventoryList(auditedOnly: boolean, year: number) {
  return useQuery({
    queryKey: ["dashboard", "inventory-list", auditedOnly, year],
    queryFn: () => fetchInventoryList(auditedOnly, year),
    placeholderData: MOCK_INVENTORIES,
  });
}

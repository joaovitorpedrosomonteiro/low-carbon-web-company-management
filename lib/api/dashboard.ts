import api from "./client";

export interface DashboardSummary {
  totalTCO2e: number;
  inventoryCount: number;
  auditedCount: number;
  pendingCount: number;
  yoyDelta: number;
  inventoryDelta: number;
}

export interface TimeSeriesPoint {
  month: string;
  tco2e: number;
  prevYearTco2e?: number;
}

export interface ScopeBreakdownItem {
  scope: string;
  tco2e: number;
  percentage: number;
  categories: { name: string; tco2e: number }[];
}

export interface BranchRankingItem {
  branchId: string;
  branchName: string;
  tco2e: number;
  rank: number;
}

export interface TopEmissionItem {
  id: string;
  emissionName: string;
  categoryName: string;
  scope: string;
  tco2e: number;
  percentage: number;
  inventoryId: string;
}

export interface MissingDataItem {
  inventoryId: string;
  inventoryName: string;
  branchName: string;
  missingVariableCount: number;
}

export interface FunnelData {
  total: number;
  toReportEmissions: number;
  toProvideEvidence: number;
  forAuditing: number;
  forReview: number;
  audited: number;
}

export interface AuditCycleTime {
  avgDays: number;
  byAuditor: { auditorName: string; avgDays: number }[];
}

export interface BenchmarkItem {
  categoryName: string;
  companyValue: number;
  sectorAverage: number;
}

export interface InventoryListItem {
  id: string;
  name: string;
  branchName: string;
  period: string;
  state: string;
  tco2e: number;
}

export async function fetchDashboardSummary(
  auditedOnly: boolean,
  year: number
): Promise<DashboardSummary> {
  const { data } = await api.get("/v1/inventories/dashboard/summary", {
    params: { auditedOnly, year },
  });
  return data;
}

export async function fetchTimeSeries(
  auditedOnly: boolean,
  year: number
): Promise<TimeSeriesPoint[]> {
  const { data } = await api.get("/v1/inventories/dashboard/time-series", {
    params: { auditedOnly, year },
  });
  return data;
}

export async function fetchScopeBreakdown(
  auditedOnly: boolean,
  year: number
): Promise<ScopeBreakdownItem[]> {
  const { data } = await api.get("/v1/inventories/dashboard/scope-breakdown", {
    params: { auditedOnly, year },
  });
  return data;
}

export async function fetchBranchRanking(
  auditedOnly: boolean,
  year: number
): Promise<BranchRankingItem[]> {
  const { data } = await api.get("/v1/inventories/dashboard/branch-ranking", {
    params: { auditedOnly, year },
  });
  return data;
}

export async function fetchTopEmissions(
  auditedOnly: boolean,
  year: number
): Promise<TopEmissionItem[]> {
  const { data } = await api.get("/v1/inventories/dashboard/top-emissions", {
    params: { auditedOnly, year },
  });
  return data;
}

export async function fetchMissingData(): Promise<MissingDataItem[]> {
  const { data } = await api.get("/v1/inventories/dashboard/missing-data");
  return data;
}

export async function fetchFunnelData(
  auditedOnly: boolean
): Promise<FunnelData> {
  const { data } = await api.get("/v1/inventories/dashboard/funnel", {
    params: { auditedOnly },
  });
  return data;
}

export async function fetchAuditCycleTime(): Promise<AuditCycleTime> {
  const { data } = await api.get(
    "/v1/inventories/dashboard/audit-cycle-time"
  );
  return data;
}

export async function fetchBenchmarkData(
  auditedOnly: boolean,
  year: number
): Promise<BenchmarkItem[]> {
  const { data } = await api.get("/v1/inventories/dashboard/benchmarks", {
    params: { auditedOnly, year },
  });
  return data;
}

export async function fetchInventoryList(
  auditedOnly: boolean,
  year: number
): Promise<InventoryListItem[]> {
  const { data } = await api.get("/v1/inventories", {
    params: { auditedOnly, year },
  });
  return data.data ?? data;
}

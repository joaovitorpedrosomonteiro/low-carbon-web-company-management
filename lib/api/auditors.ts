import api from "./client";

export interface Auditor {
  id: string;
  email: string;
  icpCertificateSerial: string;
}

export interface AccessGrant {
  id: string;
  auditorId: string;
  auditorEmail: string;
  scope: "single_inventory" | "company_branch" | "company";
  inventoryId?: string;
  branchId?: string;
  companyId?: string;
  grantedAt: string;
}

export interface GrantAccessPayload {
  auditorId: string;
  scope: "single_inventory" | "company_branch" | "company";
  inventoryId?: string;
  branchId?: string;
}

export async function listAuditors(): Promise<Auditor[]> {
  const { data } = await api.get("/v1/auditor-access");
  return data.data ?? data;
}

export async function createAuditor(payload: {
  email: string;
  icpCertificatePem: string;
}): Promise<Auditor> {
  const { data } = await api.post("/v1/users/auditors", payload);
  return data;
}

export async function listAccessGrants(): Promise<AccessGrant[]> {
  const { data } = await api.get("/v1/auditor-access");
  return data.data ?? data;
}

export async function grantAccess(
  payload: GrantAccessPayload
): Promise<AccessGrant> {
  const { data } = await api.post("/v1/auditor-access", payload);
  return data;
}

export async function revokeAccess(grantId: string): Promise<void> {
  await api.delete(`/v1/auditor-access/${grantId}`);
}

import api from "./client";

export interface Branch {
  id: string;
  name: string;
  companyId: string;
}

export interface CreateBranchPayload {
  name: string;
}

export async function listBranches(companyId: string): Promise<Branch[]> {
  const { data } = await api.get(`/v1/companies/${companyId}/branches`);
  return data.data ?? data;
}

export async function createBranch(
  companyId: string,
  payload: CreateBranchPayload
): Promise<Branch> {
  const { data } = await api.post(
    `/v1/companies/${companyId}/branches`,
    payload
  );
  return data;
}

export async function renameBranch(
  companyId: string,
  branchId: string,
  name: string
): Promise<Branch> {
  const { data } = await api.patch(
    `/v1/companies/${companyId}/branches/${branchId}`,
    { name }
  );
  return data;
}

export async function getBranch(
  companyId: string,
  branchId: string
): Promise<Branch> {
  const { data } = await api.get(
    `/v1/companies/${companyId}/branches/${branchId}`
  );
  return data;
}

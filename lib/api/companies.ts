import api from "./client";

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface UpdateCompanyPayload {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export async function getCompany(companyId: string): Promise<Company> {
  const { data } = await api.get(`/v1/companies/${companyId}`);
  return data;
}

export async function updateCompany(
  companyId: string,
  payload: UpdateCompanyPayload
): Promise<Company> {
  const { data } = await api.patch(`/v1/companies/${companyId}`, payload);
  return data;
}

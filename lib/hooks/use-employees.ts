import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";

export interface Employee {
  id: string;
  email: string;
  companyBranchId: string;
}

export async function listEmployees(branchId: string): Promise<Employee[]> {
  const { data } = await api.get(`/v1/users/employees`, {
    params: { branchId },
  });
  return data.data ?? data;
}

export async function createEmployee(payload: {
  email: string;
  companyBranchId: string;
}): Promise<Employee> {
  const { data } = await api.post("/v1/users/employees", payload);
  return data;
}

export function useEmployees(branchId: string) {
  return useQuery({
    queryKey: ["employees", branchId],
    queryFn: () => listEmployees(branchId),
    enabled: !!branchId,
  });
}

export function useCreateEmployee(branchId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { email: string; companyBranchId: string }) =>
      createEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", branchId] });
    },
  });
}

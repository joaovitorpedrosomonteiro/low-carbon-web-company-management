import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompany,
  updateCompany,
  type UpdateCompanyPayload,
} from "@/lib/api/companies";

export function useCompany(companyId: string) {
  return useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompany(companyId),
    enabled: !!companyId,
  });
}

export function useUpdateCompany(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCompanyPayload) =>
      updateCompany(companyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
    },
  });
}

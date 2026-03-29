import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listBranches,
  createBranch,
  renameBranch,
  type CreateBranchPayload,
} from "@/lib/api/branches";

export function useBranches(companyId: string) {
  return useQuery({
    queryKey: ["branches", companyId],
    queryFn: () => listBranches(companyId),
    enabled: !!companyId,
  });
}

export function useCreateBranch(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBranchPayload) =>
      createBranch(companyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches", companyId] });
    },
  });
}

export function useRenameBranch(companyId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ branchId, name }: { branchId: string; name: string }) =>
      renameBranch(companyId, branchId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches", companyId] });
    },
  });
}

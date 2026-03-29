import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listAuditors,
  createAuditor,
  listAccessGrants,
  grantAccess,
  revokeAccess,
  type GrantAccessPayload,
} from "@/lib/api/auditors";

export function useAuditors() {
  return useQuery({
    queryKey: ["auditors"],
    queryFn: listAuditors,
  });
}

export function useCreateAuditor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { email: string; icpCertificatePem: string }) =>
      createAuditor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auditors"] });
    },
  });
}

export function useAccessGrants() {
  return useQuery({
    queryKey: ["access-grants"],
    queryFn: listAccessGrants,
  });
}

export function useGrantAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GrantAccessPayload) => grantAccess(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["access-grants"] });
    },
  });
}

export function useRevokeAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (grantId: string) => revokeAccess(grantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["access-grants"] });
    },
  });
}

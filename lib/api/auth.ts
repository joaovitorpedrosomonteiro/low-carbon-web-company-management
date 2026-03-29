import api from "./client";

export interface User {
  id: string;
  email: string;
  role: "system_admin" | "company_admin" | "employee" | "auditor";
  companyId?: string;
  branchId?: string;
  onboardingCompleted?: boolean;
  mustChangePassword: boolean;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<LoginResponse>("/v1/auth/login", {
    email,
    password,
  });

  if (typeof window !== "undefined") {
    document.cookie = `access_token=${data.accessToken}; path=/; samesite=strict`;
  }

  return data.user;
}

export async function logout(): Promise<void> {
  await api.post("/v1/auth/logout");
  if (typeof window !== "undefined") {
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await api.post("/v1/auth/change-password", {
    currentPassword,
    newPassword,
  });
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/v1/users/me");
  return data;
}

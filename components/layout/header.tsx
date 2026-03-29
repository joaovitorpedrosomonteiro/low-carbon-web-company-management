"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { logout as apiLogout } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function Header() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const storeLogout = useAuthStore((s) => s.logout);

  async function handleLogout() {
    try {
      await apiLogout();
    } catch {
      // ignore
    }
    storeLogout();
    router.push("/login");
  }

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-green-700">
          Low Carbon
        </span>
        {user && (
          <span className="text-sm text-muted-foreground">
            | {user.role === "company_admin" ? "Admin da Empresa" : user.role === "system_admin" ? "Admin do Sistema" : user.role}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          {user?.email}
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  GitBranch,
  Users,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/company", label: "Empresa", icon: Building2 },
  { href: "/branches", label: "Filiais", icon: GitBranch },
  { href: "/auditors", label: "Auditores", icon: ShieldCheck },
  { href: "/change-password", label: "Alterar Senha", icon: KeyRound },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isSystemAdmin = useAuthStore((s) => s.isSystemAdmin);

  const filteredNav = navItems.filter((item) => {
    if (isSystemAdmin() && item.href === "/company") return false;
    return true;
  });

  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">LC</span>
          </div>
          <div>
            <p className="font-semibold text-sm">Low Carbon</p>
            <p className="text-xs text-muted-foreground">
              Gestão Empresarial
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {filteredNav.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

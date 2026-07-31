import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardMobileNav } from "./dashboard-mobile-nav"
import type { Role } from "@/types/auth"

export function DashboardShell({
  role,
  children,
}: {
  role: Role
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <DashboardSidebar role={role} />

      <div className="flex-1">
        <DashboardMobileNav role={role} />
        <main className="container mx-auto px-4 py-10">{children}</main>
      </div>
    </div>
  )
}
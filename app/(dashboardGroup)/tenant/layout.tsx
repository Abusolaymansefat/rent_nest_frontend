import { getCurrentUser } from "@/service/auth"
import { redirect } from "next/navigation"
import { DashboardShell } from "../_components/dashboard/dashboard-shell"


export default async function TenantLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) redirect("/login?redirectTo=/tenant")
  if (user.role !== "TENANT") redirect("/")

  return <DashboardShell role="TENANT">{children}</DashboardShell>
}

// 
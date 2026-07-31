import { getCurrentUser } from "@/service/auth"
import { redirect } from "next/navigation"
import { DashboardShell } from "../_components/dashboard/dashboard-shell"


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) redirect("/login?redirectTo=/dashboard/admin")
  if (user.role !== "ADMIN") redirect("/")

  return <DashboardShell role="ADMIN">{children}</DashboardShell>
}
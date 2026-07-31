import { getCurrentUser } from "@/service/auth"
import { redirect } from "next/navigation"
import { DashboardShell } from "../_components/dashboard/dashboard-shell"


export default async function LandlordLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) redirect("/login?redirectTo=/dashboard/landlord")
  if (user.role !== "LANDLORD") redirect("/")

  return <DashboardShell role="LANDLORD">{children}</DashboardShell>
}
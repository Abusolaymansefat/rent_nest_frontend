import {
  LayoutDashboard, Building2, ClipboardList, User, Settings, CreditCard, Users, ShieldCheck,
} from "lucide-react"
import type { Role } from "@/types/auth"

export type NavItem = {
  label: string
  href: string
  icon: typeof LayoutDashboard
}

export const dashboardNavByRole: Record<Role, NavItem[]> = {
  TENANT: [
    { label: "Overview", href: "/dashboard/tenant", icon: LayoutDashboard },
    { label: "Rental Requests", href: "/dashboard/tenant", icon: ClipboardList },
    { label: "Payments", href: "/dashboard/tenant/payments", icon: CreditCard },
    { label: "Profile", href: "/dashboard/tenant/profile", icon: User },
    { label: "Settings", href: "/dashboard/tenant/settings", icon: Settings },
  ],
  LANDLORD: [
    { label: "Overview", href: "/dashboard/landlord", icon: LayoutDashboard },
    { label: "My Properties", href: "/dashboard/landlord/properties", icon: Building2 },
    { label: "Requests", href: "/dashboard/landlord/requests", icon: ClipboardList },
    { label: "Profile", href: "/dashboard/landlord/profile", icon: User },
    { label: "Settings", href: "/dashboard/landlord/settings", icon: Settings },
  ],
  ADMIN: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Properties", href: "/dashboard/admin/properties", icon: Building2 },
    { label: "Moderation", href: "/dashboard/admin/moderation", icon: ShieldCheck },
  ],
}
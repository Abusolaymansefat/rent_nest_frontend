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
    { label: "Overview", href: "/tenant", icon: LayoutDashboard },
    { label: "Rental Requests", href: "/tenant/requests", icon: ClipboardList },
    { label: "Payments", href: "/tenant/payments", icon: CreditCard },
    { label: "Profile", href: "/tenant/profile", icon: User },
    { label: "Settings", href: "/tenant/settings", icon: Settings },
  ],
  LANDLORD: [
    { label: "Overview", href: "/landlord", icon: LayoutDashboard },
    { label: "My Properties", href: "/landlord/properties", icon: Building2 },
    { label: "Requests", href: "/landlord/requests", icon: ClipboardList },
    { label: "Profile", href: "/landlord/profile", icon: User },
    { label: "Settings", href: "/landlord/settings", icon: Settings },
  ],
  ADMIN: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Properties", href: "/admin/properties", icon: Building2 },
    { label: "Moderation", href: "/admin/moderation", icon: ShieldCheck },
  ],
}
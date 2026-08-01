import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Building2, Home, Tag, TrendingUp } from "lucide-react"
import { getDashboardStats } from "../_actions/admin"

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-emerald-600" },
    { label: "Total Properties", value: stats.totalProperties, icon: Building2, color: "text-blue-600" },
    { label: "Total Rentals", value: stats.totalRentals, icon: Home, color: "text-yellow-500" },
    { label: "Completed Rentals", value: stats.totalCompletedRentals, icon: TrendingUp, color: "text-purple-600" },
  ]

  const totalAdmins = stats.totalUsers - stats.totalLandlords - stats.totalTenants
  const maxRoleCount = Math.max(stats.totalLandlords, stats.totalTenants, totalAdmins, 1)

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Admin Overview</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <Card key={c.label}>
              <CardContent className="flex items-center gap-4 py-6">
                <Icon className={`h-8 w-8 ${c.color}`} />
                <div>
                  <p className="text-2xl font-bold">{c.value}</p>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users by Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Tenants", value: stats.totalTenants, color: "bg-emerald-500" },
                { label: "Landlords", value: stats.totalLandlords, color: "bg-blue-500" },
                { label: "Admins", value: totalAdmins, color: "bg-purple-500" },
              ].map((r) => (
                <div key={r.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{r.label}</span>
                    <span className="font-semibold">{r.value}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${r.color} transition-all duration-700`}
                      style={{ width: `${(r.value / maxRoleCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" /> View All Users
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/moderation">
                <Building2 className="mr-2 h-4 w-4" /> View Properties & Rentals
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/categories">
                <Tag className="mr-2 h-4 w-4" /> Manage Categories
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
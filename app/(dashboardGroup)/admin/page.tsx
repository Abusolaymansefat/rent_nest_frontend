import { Card, CardContent } from "@/components/ui/card"
import { Users, Building2, Clock, DollarSign } from "lucide-react"
import { getPlatformStats } from "../_actions/admin"

export default async function AdminDashboardPage() {
  const stats = await getPlatformStats()

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-emerald-600" },
    { label: "Total Properties", value: stats.totalProperties, icon: Building2, color: "text-blue-600" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: Clock, color: "text-yellow-500" },
    { label: "Platform Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600" },
  ]

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Admin Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
    </>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Building2, Clock, DollarSign, TrendingUp, Activity, ShieldCheck, BarChart3 } from "lucide-react"
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
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Admin Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Platform Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "User Growth", value: 85, color: "bg-emerald-500" },
                { label: "Property Listings", value: 72, color: "bg-blue-500" },
                { label: "Revenue Growth", value: 94, color: "bg-purple-500" },
                { label: "Active Rentals", value: 68, color: "bg-orange-500" },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <span className="font-semibold">{metric.value}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${metric.color} rounded-full transition-all duration-700`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "New User Registration", time: "2 hours ago", type: "user" },
                { activity: "Property Listed", time: "4 hours ago", type: "property" },
                { activity: "Rental Request Approved", time: "6 hours ago", type: "request" },
                { activity: "Payment Completed", time: "8 hours ago", type: "payment" },
                { activity: "Account Suspension", time: "12 hours ago", type: "admin" },
              ].map((item) => {
                const typeColors = {
                  user: "bg-emerald-100 text-emerald-800",
                  property: "bg-blue-100 text-blue-800",
                  request: "bg-yellow-100 text-yellow-800",
                  payment: "bg-purple-100 text-purple-800",
                  admin: "bg-red-100 text-red-800"
                }

                return (
                  <div key={item.activity} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${typeColors[item.type as keyof typeof typeColors]}`} />
                      <span className="text-sm font-medium">{item.activity}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "API Response Time", value: "45ms", status: "good" },
                { metric: "Database Health", value: "99.9%", status: "good" },
                { metric: "Server Uptime", value: "99.8%", status: "good" },
                { metric: "Cache Hit Rate", value: "87%", status: "warning" },
              ].map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.metric}</span>
                  <span className={`text-sm font-semibold ${
                    item.status === "good" ? "text-emerald-600" : "text-yellow-600"
                  }`}>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Security Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { issue: "Failed Login Attempts", count: 12, level: "warning" },
                { issue: "Suspicious Activity", count: 3, level: "danger" },
                { issue: "Account Reports", count: 5, level: "info" },
                { issue: "API Rate Limits", count: 0, level: "success" },
              ].map((item) => {
                const levelColors = {
                  warning: "bg-yellow-100 text-yellow-800",
                  danger: "bg-red-100 text-red-800",
                  info: "bg-blue-100 text-blue-800",
                  success: "bg-emerald-100 text-emerald-800"
                }

                return (
                  <div key={item.issue} className="flex items-center justify-between p-2 rounded-lg">
                    <span className="text-sm">{item.issue}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${levelColors[item.level as keyof typeof levelColors]}`}>
                      {item.count}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                View All Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Manage Properties
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Review Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

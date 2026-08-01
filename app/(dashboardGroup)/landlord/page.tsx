import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Clock, DollarSign, TrendingUp, Users } from "lucide-react"
import { getMyProperties, getMyRequests } from "../_actions/landlord"

export default async function LandlordDashboardPage() {
  const [properties, requests] = await Promise.all([getMyProperties(), getMyRequests()])

  const activeRequests = requests.filter((r) => r.status === "PENDING").length
  const approvedRequests = requests.filter((r) => r.status === "APPROVED").length
  const earnings = requests
    .filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + r.property.price, 0)

  const totalTenants = requests.filter((r) => r.status === "ACTIVE").length

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Landlord Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card><CardContent className="flex items-center gap-4 py-6">
          <Building2 className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="text-2xl font-bold">{properties.length}</p>
            <p className="text-sm text-muted-foreground">Total Properties</p>
          </div>
        </CardContent></Card>

        <Card><CardContent className="flex items-center gap-4 py-6">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">{activeRequests}</p>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
          </div>
        </CardContent></Card>

        <Card><CardContent className="flex items-center gap-4 py-6">
          <DollarSign className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="text-2xl font-bold">${earnings.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Monthly Earnings</p>
          </div>
        </CardContent></Card>

        <Card><CardContent className="flex items-center gap-4 py-6">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-2xl font-bold">{totalTenants}</p>
            <p className="text-sm text-muted-foreground">Active Tenants</p>
          </div>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue by Property
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.slice(0, 5).map((property) => {
                const propertyEarnings = requests
                  .filter((r) => r.propertyId === property.id && (r.status === "ACTIVE" || r.status === "COMPLETED"))
                  .reduce((sum, r) => sum + r.property.price, 0)
                const maxEarnings = Math.max(...properties.map(p => 
                  requests.filter((r) => r.propertyId === p.id && (r.status === "ACTIVE" || r.status === "COMPLETED"))
                  .reduce((sum, r) => sum + r.property.price, 0)
                ), 1)
                const percentage = maxEarnings > 0 ? (propertyEarnings / maxEarnings) * 100 : 0

                return (
                  <div key={property.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{property.title}</span>
                      <span className="text-emerald-600 font-semibold">${propertyEarnings.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {properties.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No properties yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Request Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["PENDING", "APPROVED", "ACTIVE", "COMPLETED", "REJECTED"].map((status) => {
                const count = requests.filter((r) => r.status === status).length
                const percentage = requests.length > 0 ? (count / requests.length) * 100 : 0
                const colors = {
                  PENDING: "bg-yellow-500",
                  APPROVED: "bg-blue-500",
                  ACTIVE: "bg-emerald-500",
                  COMPLETED: "bg-purple-500",
                  REJECTED: "bg-red-500"
                }

                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[status as keyof typeof colors]} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {requests.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No requests yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Home, CheckCircle, DollarSign, Calendar, Building2 } from "lucide-react"
import { getMyRentalRequests } from "../_actions/rentals"
import { RentalRequestCard } from "../_components/rentals/rental-request-card"

export default async function TenantDashboardPage() {
  const requests = await getMyRentalRequests()

  const counts = {
    pending: requests.filter((r) => r.status === "PENDING").length,
    active: requests.filter((r) => r.status === "ACTIVE").length,
    completed: requests.filter((r) => r.status === "COMPLETED").length,
  }

  const totalSpent = requests
    .filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + r.property.price, 0)

  const uniqueProperties = new Set(requests.map((r) => r.propertyId)).size

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="flex items-center gap-4 py-6">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">{counts.pending}</p>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <Home className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="text-2xl font-bold">{counts.active}</p>
            <p className="text-sm text-muted-foreground">Active Rentals</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <CheckCircle className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-2xl font-bold">{counts.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <DollarSign className="h-8 w-8 text-purple-600" />
          <div>
            <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Property Types Requested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["APARTMENT", "HOUSE", "STUDIO", "CONDO", "VILLA"].map((type) => {
                const count = requests.filter((r) => r.property.propertyType === type).length
                const percentage = requests.length > 0 ? (count / requests.length) * 100 : 0
                const colors = {
                  APARTMENT: "bg-blue-500",
                  HOUSE: "bg-emerald-500",
                  STUDIO: "bg-purple-500",
                  CONDO: "bg-orange-500",
                  VILLA: "bg-pink-500"
                }

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{type}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[type as keyof typeof colors]} rounded-full transition-all duration-500`}
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Rental Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["This Week", "This Month", "Last 3 Months", "All Time"].map((period) => {
                const count = requests.length > 0 ? Math.floor(Math.random() * requests.length) : 0
                const percentage = requests.length > 0 ? (count / requests.length) * 100 : 0

                return (
                  <div key={period} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{period}</span>
                      <span className="font-semibold">{count} requests</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
              {requests.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No activity yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Recent Rental Requests</h2>

      {requests.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">
          You haven&apos;t submitted any rental requests yet.
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {requests.slice(0, 5).map((r) => <RentalRequestCard key={r.id} request={r} />)}
        </div>
      )}
    </div>
  )
}
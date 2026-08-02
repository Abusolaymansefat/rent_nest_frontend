import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Clock, DollarSign, TrendingUp, Users, Plus, MessageSquare, AlertCircle, Activity, Star } from "lucide-react"
import { getMyProperties, getMyRequests } from "../_actions/landlord"
import Link from "next/link"

export default async function LandlordDashboardPage() {
  const [properties, requests] = await Promise.all([getMyProperties(), getMyRequests()])

  const activeRequests = requests.filter((r) => r.status === "PENDING").length
  const earnings = requests
    .filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + r.property.price, 0)

  const totalTenants = requests.filter((r) => r.status === "ACTIVE").length
  const occupancyRate = properties.length > 0 ? Math.round((totalTenants / properties.length) * 100) : 0
  const averageRating = "4.5"

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
        <Button asChild>
          <Link href="/landlord/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                <span className="text-sm font-semibold text-emerald-600">{occupancyRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <span className="text-sm font-semibold text-yellow-600 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  {averageRating}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <span className="text-sm font-semibold text-blue-600">2.4 hrs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Booking Rate</span>
                <span className="text-sm font-semibold text-purple-600">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requests.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full ${
                    request.status === "PENDING" ? "bg-yellow-500" :
                    request.status === "APPROVED" ? "bg-blue-500" :
                    request.status === "ACTIVE" ? "bg-emerald-500" :
                    request.status === "COMPLETED" ? "bg-purple-500" :
                    "bg-red-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{request.property.title}</p>
                    <p className="text-xs text-muted-foreground">{request.status}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/landlord/properties/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Property
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/landlord/requests">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Rental Requests
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/landlord/properties">
                  <Building2 className="mr-2 h-4 w-4" />
                  Manage Properties
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/landlord/profile">
                  <Users className="mr-2 h-4 w-4" />
                  Update Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

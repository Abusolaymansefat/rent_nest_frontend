import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Home, CheckCircle, DollarSign, Calendar, Search, CreditCard, MessageSquare, Star, TrendingUp } from "lucide-react"
import { getMyRentalRequests } from "../_actions/rentals"
import { RentalRequestCard } from "../_components/rentals/rental-request-card"
import Link from "next/link"

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

  const averageRating = "4.5"
  const bookingSuccessRate = requests.length > 0 ? Math.round((counts.completed / requests.length) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Button asChild>
          <Link href="/properties">
            <Search className="mr-2 h-4 w-4" />
            Browse Properties
          </Link>
        </Button>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Rental Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { period: "This Week", count: requests.filter((r) => r.status === "PENDING").length },
                { period: "This Month", count: requests.filter((r) => r.status === "APPROVED").length },
                { period: "Last 3 Months", count: requests.filter((r) => r.status === "ACTIVE").length },
                { period: "All Time", count: requests.length }
              ].map((item) => {
                const percentage = requests.length > 0 ? (item.count / requests.length) * 100 : 0

                return (
                  <div key={item.period} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.period}</span>
                      <span className="font-semibold">{item.count} requests</span>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Account Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Booking Success Rate</span>
                <span className="text-sm font-semibold text-emerald-600">{bookingSuccessRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Average Rating</span>
                <span className="text-sm font-semibold text-yellow-600 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  {averageRating}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Payment Methods</span>
                <span className="text-sm font-semibold text-blue-600">3 Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-muted-foreground">Saved Properties</span>
                <span className="text-sm font-semibold text-purple-600">{requests.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Recent Properties Viewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requests.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{request.property.title}</p>
                    <p className="text-xs text-muted-foreground">{request.property.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    request.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                    request.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                    request.status === "ACTIVE" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {request.status}
                  </span>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No properties viewed yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Rental Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No rental requests yet</p>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, 5).map((r) => <RentalRequestCard key={r.id} request={r} />)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/properties">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Properties
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/tenant/requests">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Rental Requests
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/tenant/payments">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment History
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/tenant/profile">
                  <Home className="mr-2 h-4 w-4" />
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
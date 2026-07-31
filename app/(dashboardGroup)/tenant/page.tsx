import { Card, CardContent } from "@/components/ui/card"
import { getMyRentalRequests } from "../_actions/rentals"
import { RentalRequestCard } from "../_components/rentals/rental-request-card"

export default async function TenantDashboardPage() {
  const requests = await getMyRentalRequests()

  const counts = {
    pending: requests.filter((r) => r.status === "PENDING").length,
    active: requests.filter((r) => r.status === "ACTIVE").length,
    completed: requests.filter((r) => r.status === "COMPLETED").length,
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card><CardContent className="py-6 text-center">
          <p className="text-3xl font-bold">{counts.pending}</p>
          <p className="text-sm text-muted-foreground">Pending Requests</p>
        </CardContent></Card>
        <Card><CardContent className="py-6 text-center">
          <p className="text-3xl font-bold">{counts.active}</p>
          <p className="text-sm text-muted-foreground">Active Rentals</p>
        </CardContent></Card>
        <Card><CardContent className="py-6 text-center">
          <p className="text-3xl font-bold">{counts.completed}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </CardContent></Card>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Rental Requests</h2>

      {requests.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">
          You haven&apos;t submitted any rental requests yet.
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => <RentalRequestCard key={r.id} request={r} />)}
        </div>
      )}
    </div>
  )
}
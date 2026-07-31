import { Card, CardContent } from "@/components/ui/card"
import { getMyRentalRequests } from "../../_actions/rentals"
import { RentalRequestCard } from "../../_components/rentals/rental-request-card"

export default async function TenantRequestsPage() {
  const requests = await getMyRentalRequests()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Rental Requests</h1>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <p className="text-center text-muted-foreground">
                You haven&apos;t made any rental requests yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <RentalRequestCard key={request.id} request={request} />
          ))
        )}
      </div>
    </div>
  )
}

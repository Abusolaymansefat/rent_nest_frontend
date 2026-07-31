import { Card, CardContent } from "@/components/ui/card"
import { LandlordRequestRow } from "../../_components/landlord/landlord-request-row"
import { getMyRequests } from "../../_actions/landlord"


export default async function LandlordRequestsPage() {
  const requests = await getMyRequests()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Incoming Requests</h1>

      <Card>
        <CardContent>
          {requests.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">No rental requests yet.</p>
          ) : (
            requests.map((r) => <LandlordRequestRow key={r.id} request={r} />)
          )}
        </CardContent>
      </Card>
    </div>
  )
}
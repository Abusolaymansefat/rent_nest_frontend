import { Card, CardContent } from "@/components/ui/card"
import { getAllProperties, getAllRentals } from "../../_actions/admin"
import { ModerationPropertyRow } from "../../_components/dashboard/moderation-property-row"
import { StatusBadge } from "../../_components/rentals/status-badge"


export default async function ModerationPage() {
  const [{ data: properties }, { data: rentals }] = await Promise.all([
    getAllProperties(),
    getAllRentals(),
  ])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-6 text-3xl font-bold">Content Moderation</h1>

        <h2 className="mb-3 text-xl font-semibold">All Listings</h2>
        <Card>
          <CardContent>
            {properties.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground">No listings found.</p>
            ) : (
              properties.map((p) => <ModerationPropertyRow key={p.id} property={p} />)
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-semibold">All Rental Requests</h2>
        <Card>
          <CardContent>
            {rentals.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground">No requests found.</p>
            ) : (
              rentals.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-4 border-b py-3 last:border-b-0">
                  <div>
                    <p className="font-medium">{r.property.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Move-in: {new Date(r.moveInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
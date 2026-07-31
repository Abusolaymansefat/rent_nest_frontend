import { Card, CardContent } from "@/components/ui/card"
import { Building2, Clock, DollarSign } from "lucide-react"
import { getMyProperties, getMyRequests } from "../_actions/landlord"

export default async function LandlordDashboardPage() {
  const [properties, requests] = await Promise.all([getMyProperties(), getMyRequests()])

  const activeRequests = requests.filter((r) => r.status === "PENDING").length
  const earnings = requests
    .filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
    .reduce((sum, r) => sum + r.property.price, 0)

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Landlord Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
      </div>
    </div>
  )
}

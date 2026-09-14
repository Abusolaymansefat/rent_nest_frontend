import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LandlordRequestRow } from "../../_components/landlord/landlord-request-row"
import { getMyRequests } from "../../_actions/landlord"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"


export default async function LandlordRequestsPage() {
  const requests = await getMyRequests()

  const stats = {
    pending: requests.filter((r) => r.status === "PENDING").length,
    approved: requests.filter((r) => r.status === "APPROVED").length,
    rejected: requests.filter((r) => r.status === "REJECTED").length,
    active: requests.filter((r) => r.status === "ACTIVE").length,
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Incoming Requests</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="flex items-center gap-4 py-6">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <CheckCircle className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{stats.approved}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <XCircle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-2xl font-bold">{stats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <AlertCircle className="h-8 w-8 text-emerald-500" />
          <div>
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Management</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">No rental requests yet.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => <LandlordRequestRow key={r.id} request={r} />)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
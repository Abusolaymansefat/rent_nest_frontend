import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/service/auth"
import { getMyRentalRequests } from "../../_actions/rentals"
import { DollarSign, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function TenantPaymentsPage() {
  const user = await getCurrentUser()
  const requests = await getMyRentalRequests()

  if (!user) return null

  const paidRequests = requests.filter((r) => r.status === "ACTIVE" || r.status === "COMPLETED")
  const totalSpent = paidRequests.reduce((sum, r) => sum + r.property.price, 0)

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Payment History</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card><CardContent className="flex items-center gap-4 py-6">
          <DollarSign className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 py-6">
          <CheckCircle className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-2xl font-bold">{paidRequests.length}</p>
            <p className="text-sm text-muted-foreground">Payments Made</p>
          </div>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
        </CardHeader>
        <CardContent>
          {paidRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No payment history available.</p>
          ) : (
            <div className="space-y-4">
              {paidRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{request.property.title}</p>
                    <p className="text-sm text-muted-foreground">{request.property.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(request.moveInDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">${request.property.price}</p>
                    <Badge variant={request.status === "ACTIVE" ? "default" : "secondary"}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

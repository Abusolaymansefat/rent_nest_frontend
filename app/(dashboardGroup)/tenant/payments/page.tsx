import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/service/auth"

export default async function TenantPaymentsPage() {
  const user = await getCurrentUser()

  if (!user) return null

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Payment History</h1>

      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No payment history available.</p>
        </CardContent>
      </Card>
    </div>
  )
}

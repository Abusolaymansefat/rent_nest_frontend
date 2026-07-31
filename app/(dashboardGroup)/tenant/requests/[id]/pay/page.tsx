import { redirect, notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { getMyRentalRequests } from "@/app/(dashboardGroup)/_actions/rentals"
import { PayNowButton } from "@/app/(dashboardGroup)/_components/rentals/pay-now-button"

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const requests = await getMyRentalRequests()
  const request = requests.find((r) => r.id === id)

  if (!request) notFound()
  if (request.status !== "APPROVED") {
    redirect("/tenant")
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Complete Payment</h1>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Property</span>
            <span className="font-medium">{request.property.title}</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="text-muted-foreground">Amount</span>
            <span className="text-xl font-bold text-emerald-600">
              ${request.property.price.toLocaleString()}
            </span>
          </div>

          <PayNowButton rentalRequestId={request.id} />
        </CardContent>
      </Card>
    </div>
  )
}
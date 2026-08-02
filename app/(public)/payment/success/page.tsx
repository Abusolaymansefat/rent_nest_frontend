import Link from "next/link"
import { CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { confirmPayment } from "../../_actions/payments"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <Card>
          <CardContent className="space-y-4 py-10">
            <XCircle className="mx-auto h-14 w-14 text-red-500" />
            <h1 className="text-2xl font-bold">Missing Payment Session</h1>
            <p className="text-muted-foreground">
              We couldn&apos;t find a session reference. If you completed payment, check your dashboard.
            </p>
            <Button asChild className="w-full rounded-full">
              <Link href="/tenant">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const result = await confirmPayment(session_id)

  return (
    <div className="container mx-auto max-w-md px-4 py-20 text-center">
      <Card>
        <CardContent className="space-y-4 py-10">
          {result.success ? (
            <>
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <h1 className="text-2xl font-bold">Payment Successful</h1>
              <p className="text-muted-foreground">
                Your rental payment has been confirmed. You can now view your active rental in the dashboard.
              </p>
            </>
          ) : (
            <>
              <XCircle className="mx-auto h-14 w-14 text-red-500" />
              <h1 className="text-2xl font-bold">Payment Confirmation Failed</h1>
              <p className="text-muted-foreground">
                {result.message || "We couldn't confirm your payment. Please contact support."}
              </p>
            </>
          )}
          <Button asChild className="w-full rounded-full">
            <Link href="/tenant">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
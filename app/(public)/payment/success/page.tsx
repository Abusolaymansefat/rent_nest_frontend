import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  return (
    <div className="container mx-auto max-w-md px-4 py-20 text-center">
      <Card>
        <CardContent className="space-y-4 py-10">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
          <h1 className="text-2xl font-bold">Payment Successful</h1>
          <p className="text-muted-foreground">
            Your rental payment has been confirmed. You can now view your active rental in the dashboard.
          </p>
          {session_id && (
            <p className="text-xs text-muted-foreground">Reference: {session_id}</p>
          )}
          <Button asChild className="w-full rounded-full">
            <Link href="/dashboard/tenant">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
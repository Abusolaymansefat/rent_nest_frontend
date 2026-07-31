import Link from "next/link"
import { XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-20 text-center">
      <Card>
        <CardContent className="space-y-4 py-10">
          <XCircle className="mx-auto h-14 w-14 text-red-500" />
          <h1 className="text-2xl font-bold">Payment Cancelled</h1>
          <p className="text-muted-foreground">
            Your payment was not completed. You can try again anytime from your dashboard.
          </p>
          <Button asChild className="w-full rounded-full">
            <Link href="/tenant">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
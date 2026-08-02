"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createPaymentSession } from "@/app/(public)/_actions/payments"

export function PayNowButton({ rentalRequestId }: { rentalRequestId: string }) {
  const [isLoading, setIsLoading] = useState(false)

  async function handlePay() {
    setIsLoading(true)
    const result = await createPaymentSession(rentalRequestId)

    if (result.error || !result.url) {
      toast.error(result.error || "Could not start payment")
      setIsLoading(false)
      return
    }

    window.location.href = result.url
  }

  return (
    <Button onClick={handlePay} disabled={isLoading} className="w-full rounded-full">
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Proceed to Payment
    </Button>
  )
}
"use client"

import { useActionState } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createRentalRequest, RequestFormState } from "@/app/(dashboardGroup)/_actions/rentals"


const initialState: RequestFormState = { success: false }

export function RequestToRentForm({ propertyId }: { propertyId: string }) {
  const boundAction = createRentalRequest.bind(null, propertyId)
  const [state, formAction, isPending] = useActionState(boundAction, initialState)

  if (state.success) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-lg font-medium text-emerald-600">Request submitted!</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The landlord will review your request. Check your dashboard for updates.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="moveInDate" className="text-sm font-medium">Move-in date</label>
            <input
              id="moveInDate"
              name="moveInDate"
              type="date"
              required
              disabled={isPending}
              className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message to landlord (optional)</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              disabled={isPending}
              placeholder="Tell the landlord a bit about yourself..."
              className="w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full rounded-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
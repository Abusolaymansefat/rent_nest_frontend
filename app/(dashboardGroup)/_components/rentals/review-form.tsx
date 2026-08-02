"use client"

import { useActionState, useState } from "react"
import { Star, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewFormState, submitReview } from "../../_actions/reviews"

const initialState: ReviewFormState = { success: false }

export function ReviewForm({ rentalRequestId }: { rentalRequestId: string }) {
  const boundAction = submitReview.bind(null, rentalRequestId)
  const [state, formAction, isPending] = useActionState(boundAction, initialState)
  const [rating, setRating] = useState(0)

  if (state.success) {
    return (
      <Card><CardContent className="py-8 text-center text-emerald-600 font-medium">
        {state.message}
      </CardContent></Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="rating" value={rating} />

          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)}>
                <Star
                  size={28}
                  className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                />
              </button>
            ))}
          </div>

          <textarea
            name="comment"
            rows={4}
            placeholder="Share your experience..."
            disabled={isPending}
            className="w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
          />

          {state.message && !state.success && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full rounded-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RentalRequest } from "@/types/auth"
import { updateRequestStatus } from "../../_actions/landlord"
import { StatusBadge } from "../rentals/status-badge"


export function LandlordRequestRow({ request }: { request: RentalRequest }) {
  const [status, setStatus] = useState(request.status)
  const [isPending, startTransition] = useTransition()

  function handleUpdate(newStatus: "APPROVED" | "REJECTED") {
    const previous = status
    setStatus(newStatus) // optimistic

    startTransition(async () => {
      const result = await updateRequestStatus(request.id, newStatus)
      if (!result.success) {
        setStatus(previous)
        toast.error(result.message || "Could not update request")
      } else {
        toast.success(`Request ${newStatus.toLowerCase()}`)
      }
    })
  }

  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={request.property.images[0] || "/placeholder-property.jpg"} alt={request.property.title} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{request.property.title}</p>
        <p className="text-sm text-muted-foreground">
          Move-in: {new Date(request.moveInDate).toLocaleDateString()}
        </p>
      </div>

      <StatusBadge status={status} />

      {status === "PENDING" && (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleUpdate("APPROVED")} disabled={isPending} className="rounded-full bg-emerald-600 hover:bg-emerald-700">
            <Check className="mr-1 h-4 w-4" /> Approve
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleUpdate("REJECTED")} disabled={isPending} className="rounded-full text-red-500">
            <X className="mr-1 h-4 w-4" /> Reject
          </Button>
        </div>
      )}
    </div>
  )
}
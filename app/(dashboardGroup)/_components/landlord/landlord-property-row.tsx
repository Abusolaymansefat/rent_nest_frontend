"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Property } from "@/types/auth"
import { deleteProperty, toggleAvailability } from "../../_actions/landlord"
// import { toggleAvailability, deleteProperty } from "@/service/landlord"
// import type { Property } from "@/types/property"

export function LandlordPropertyRow({ property }: { property: Property }) {
  const [isAvailable, setIsAvailable] = useState(property.availability === "AVAILABLE")
  const [isDeleted, setIsDeleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleToggle(checked: boolean) {
    const previous = isAvailable
    setIsAvailable(checked) // optimistic

    startTransition(async () => {
      const result = await toggleAvailability(property.id, checked ? "AVAILABLE" : "UNAVAILABLE")
      if (!result.success) {
        setIsAvailable(previous) // revert
        toast.error(result.message || "Could not update availability")
      } else {
        toast.success(checked ? "Marked as available" : "Marked as unavailable")
      }
    })
  }

  function handleDelete() {
    const wasDeleted = isDeleted
    setIsDeleted(true) // optimistic

    startTransition(async () => {
      const result = await deleteProperty(property.id)
      if (!result.success) {
        setIsDeleted(wasDeleted)
        toast.error(result.message || "Could not delete property")
      } else {
        toast.success("Property deleted")
      }
    })
  }

  if (isDeleted) return null

  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={property.images[0] || "/placeholder-property.jpg"} alt={property.title} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{property.title}</p>
        <p className="text-sm text-muted-foreground">{property.location} · ${property.price}/mo</p>
      </div>

      <Badge variant={isAvailable ? "default" : "secondary"}>
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>

      <Switch checked={isAvailable} onCheckedChange={handleToggle} disabled={isPending} />

      <Button variant="ghost" size="icon" asChild>
        <Link href={`/dashboard/landlord/properties/${property.id}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this property?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The listing will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
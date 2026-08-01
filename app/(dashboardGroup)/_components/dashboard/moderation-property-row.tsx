"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Property } from "@/types/auth"
import { deleteProperty } from "../../_actions/admin"


export function ModerationPropertyRow({ property }: { property: Property }) {
  const [isDeleted, setIsDeleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    setIsDeleted(true) // optimistic

    startTransition(async () => {
      const result = await deleteProperty(property.id)
      if (!result.success) {
        setIsDeleted(false)
        toast.error(result.message || "Could not delete property")
      } else {
        toast.success("Property deleted")
      }
    })
  }

  if (isDeleted) return null

  return (
    <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
      <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={property.images[0] || "/placeholder-property.jpg"} alt={property.title} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <Link href={`/properties/${property.id}`} className="font-medium hover:underline">
          {property.title}
        </Link>
        <p className="text-sm text-muted-foreground">{property.location} · {property.landlord.name}</p>
      </div>

      <Badge variant={property.availability === "AVAILABLE" ? "default" : "secondary"}>
        {property.availability}
      </Badge>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove &quot;{property.title}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This listing will be permanently removed from the platform. This action cannot be undone.
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
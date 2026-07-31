import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import { RentalRequest } from "@/types/auth"


export function RentalRequestCard({ request }: { request: RentalRequest }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-32">
          <Image
            src={request.property.images[0] || "/placeholder-property.jpg"}
            alt={request.property.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{request.property.title}</h3>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-sm text-muted-foreground">{request.property.location}</p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} /> Move-in: {new Date(request.moveInDate).toLocaleDateString()}
          </p>
        </div>

        <div className="shrink-0">
          {request.status === "APPROVED" && (
            <Button asChild className="rounded-full">
              <Link href={`/tenant/requests/${request.id}/pay`}>Pay Now</Link>
            </Button>
          )}
          {request.status === "ACTIVE" && (
            <Button asChild variant="outline" className="rounded-full">
              <Link href={`/tenant/requests/${request.id}/review`}>Leave Review</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
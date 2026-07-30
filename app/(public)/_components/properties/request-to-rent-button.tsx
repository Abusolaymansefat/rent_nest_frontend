import { PropertyAvailability } from "@/types/auth"
import Link from "next/link"
// import type { PropertyAvailability } from "@/types/property"

export function RequestToRentButton({
  propertyId,
  availability,
}: {
  propertyId: string
  availability: PropertyAvailability
}) {
  if (availability !== "AVAILABLE") {
    return (
      <button disabled className="w-full rounded-full bg-muted py-3 font-medium text-muted-foreground">
        {availability === "RENTED" ? "Currently Rented" : "Unavailable"}
      </button>
    )
  }

  return (
    <Link
      href={`/properties/${propertyId}/request`}
      className="block w-full rounded-full bg-emerald-600 py-3 text-center font-medium text-white hover:bg-emerald-700"
    >
      Request to Rent
    </Link>
  )
}
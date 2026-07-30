import { getPropertyById } from "@/app/(public)/_actions/properties"
import { RequestToRentForm } from "@/app/(public)/_components/properties/request-to-rent-form"
import { notFound } from "next/navigation"


export default async function RequestToRentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getPropertyById(id)

  if (!property) notFound()

  return (
    <div className="container mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold">Request to Rent</h1>
      <p className="mb-6 text-muted-foreground">{property.title} — {property.location}</p>
      <RequestToRentForm propertyId={property.id} />
    </div>
  )
}
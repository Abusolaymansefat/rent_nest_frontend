import { notFound } from "next/navigation"
import { PropertyForm } from "@/app/(dashboardGroup)/_components/landlord/property-form"
import { getMyPropertyById, updateProperty } from "@/app/(dashboardGroup)/_actions/landlord"

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getMyPropertyById(id)

  if (!property) notFound()

  const boundAction = updateProperty.bind(null, property.id)

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Edit Property</h1>
      <PropertyForm action={boundAction} property={property} submitLabel="Save Changes" />
    </div>
  )
}
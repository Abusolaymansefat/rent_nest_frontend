import { PropertyForm } from "@/app/(dashboardGroup)/_components/landlord/property-form"
import { createProperty } from "@/app/(dashboardGroup)/_actions/landlord"

export default function NewPropertyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">List a New Property</h1>
      <PropertyForm action={createProperty} submitLabel="Create Property" />
    </div>
  )
}
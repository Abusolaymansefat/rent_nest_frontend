import { Suspense } from "react"
import { PropertyFilters } from "../_components/properties/property-filters"
import { getProperties } from "../_actions/properties"
import { PropertyGridSkeleton } from "../_components/properties/property-grid-skeleton"
import { PropertyGrid } from "../_components/properties/property-grid"
// import { getProperties } from "@/service/properties"
// import { PropertyGrid } from "@/components/properties/property-grid"
// import { PropertyFilters } from "@/components/properties/property-filters"
// import { PropertyGridSkeleton } from "@/components/properties/property-grid-skeleton"

type SearchParams = {
  location?: string
  minPrice?: string
  maxPrice?: string
  type?: string
  page?: string
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const filters = await searchParams

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Browse Properties</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <PropertyFilters />

        <Suspense fallback={<PropertyGridSkeleton />} key={JSON.stringify(filters)}>
          <PropertyResults filters={filters} />
        </Suspense>
      </div>
    </div>
  )
}

async function PropertyResults({ filters }: { filters: SearchParams }) {
  const { data: properties } = await getProperties(filters)
  return <PropertyGrid properties={properties} />
}
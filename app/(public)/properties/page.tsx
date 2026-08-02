import { Suspense } from "react"
import { PropertyFilters } from "../_components/properties/property-filters"
import { getProperties } from "../_actions/properties"
import { PropertyGridSkeleton } from "../_components/properties/property-grid-skeleton"
import { PropertyGrid } from "../_components/properties/property-grid"
import { PropertyPagination } from "../_components/properties/property-pagination"

type PropertyFiltersType = {
  location?: string
  minPrice?: string
  maxPrice?: string
  propertyType?: string
  categoryId?: string
  page?: string
}

type SearchParams = {
  location?: string | null
  minPrice?: string | null
  maxPrice?: string | null
  type?: string | null
  page?: string | null
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const filters = await searchParams

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Browse Properties</h1>

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
  // Filter out null values before passing to getProperties
  const cleanFilters: PropertyFiltersType = {
    location: filters?.location || undefined,
    minPrice: filters?.minPrice || undefined,
    maxPrice: filters?.maxPrice || undefined,
    propertyType: filters?.type || undefined,
    page: filters?.page || undefined,
  }

  const { data: properties, meta } = await getProperties(cleanFilters)
  const currentPage = Number(filters?.page) || 1
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1

  function buildHref(targetPage: number) {
    const params = new URLSearchParams()
    if (filters?.location) params.set("location", filters.location)
    if (filters?.minPrice) params.set("minPrice", filters.minPrice)
    if (filters?.maxPrice) params.set("maxPrice", filters.maxPrice)
    if (filters?.type) params.set("propertyType", filters.type)
    params.set("page", String(targetPage))
    return `/properties?${params.toString()}`
  }

  return (
    <div>
      <PropertyGrid properties={properties} />
      <PropertyPagination page={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  )
}
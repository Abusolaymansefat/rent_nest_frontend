// import type { Property, Category, PropertyFilters, PaginatedResponse } from "@/types/property"

import { Category, PaginatedResponse, Property, PropertyFilters } from "@/types/auth"

export async function getProperties(filters: PropertyFilters = {}): Promise<PaginatedResponse<Property>> {
  const params = new URLSearchParams()
  if (filters.location) params.set("location", filters.location)
  if (filters.minPrice) params.set("minPrice", filters.minPrice)
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice)
  if (filters.propertyType) params.set("propertyType", filters.propertyType)
  if (filters.categoryId) params.set("categoryId", filters.categoryId)
  if (filters.page) params.set("page", filters.page)

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error("Failed to fetch properties")
  return res.json()
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
    next: { revalidate: 60 },
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch property")

  const json = await res.json()
  return json.data
}

export async function getCategories(): Promise<Category[]> {
  const apiUrl = process.env.BACKEND_API_URL || "http://localhost:5000"
  const res = await fetch(`${apiUrl}/api/categories`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data
}
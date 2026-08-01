"use client"

import { useActionState, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/auth"
import type { PropertyFormState } from "../../_actions/landlord"
import { getCategories } from "@/app/(public)/_actions/properties"

const propertyTypes = ["APARTMENT", "HOUSE", "STUDIO", "CONDO", "VILLA"]

export function PropertyForm({
  action,
  property,
  submitLabel,
}: {
  action: (prevState: PropertyFormState, formData: FormData) => Promise<PropertyFormState>
  property?: Property
  submitLabel: string
}) {
  const [state, formAction, isPending] = useActionState(action, { success: false })
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to load categories:", error)
      } finally {
        setLoadingCategories(false)
      }
    }
    loadCategories()
  }, [])

  return (
    <Card>
      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input
              id="title" name="title" defaultValue={property?.title} required disabled={isPending}
              className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea
              id="description" name="description" rows={4} defaultValue={property?.description} required disabled={isPending}
              className="w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">Price / month</label>
              <input
                id="price" name="price" type="number" defaultValue={property?.price} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="propertyType" className="text-sm font-medium">Property type</label>
              <select
                id="propertyType" name="propertyType" defaultValue={property?.propertyType} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              >
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <input
                id="location" name="location" defaultValue={property?.location} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Full address</label>
              <input
                id="address" name="address" defaultValue={property?.address} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</label>
              <input
                id="bedrooms" name="bedrooms" type="number" defaultValue={property?.bedrooms} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bathrooms" className="text-sm font-medium">Bathrooms</label>
              <input
                id="bathrooms" name="bathrooms" type="number" defaultValue={property?.bathrooms} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="size" className="text-sm font-medium">Size (sqft)</label>
              <input
                id="size" name="size" type="number" defaultValue={property?.size} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">Category</label>
            {loadingCategories ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading categories...
              </div>
            ) : (
              <select
                id="categoryId" name="categoryId" defaultValue={property?.categoryId} required disabled={isPending}
                className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}
            {categories.length === 0 && !loadingCategories && (
              <p className="text-xs text-red-500">No categories available. Please create categories first.</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="images" className="text-sm font-medium">Image URLs (one per line)</label>
            <textarea
              id="images" name="images" rows={3} defaultValue={property?.images.join("\n")} disabled={isPending}
              placeholder="https://example.com/image1.jpg"
              className="w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
            <p className="text-xs text-muted-foreground">Paste hosted image URLs — one per line</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="amenities" className="text-sm font-medium">Amenities (comma-separated)</label>
            <input
              id="amenities" name="amenities" defaultValue={property?.amenities.join(", ")} disabled={isPending}
              placeholder="Parking, Pool, WiFi"
              className="w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
            />
          </div>

          {state.message && (
            <p className={`text-sm ${state.success ? "text-emerald-600" : "text-red-500"}`}>{state.message}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full rounded-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
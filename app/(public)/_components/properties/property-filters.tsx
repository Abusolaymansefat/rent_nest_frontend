"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const propertyTypes = ["APARTMENT", "HOUSE", "STUDIO", "CONDO", "VILLA"]

export function PropertyFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [location, setLocation] = React.useState(searchParams.get("location") ?? "")
  const [minPrice, setMinPrice] = React.useState(searchParams.get("minPrice") ?? "")
  const [maxPrice, setMaxPrice] = React.useState(searchParams.get("maxPrice") ?? "")
  const [propertyType, setPropertyType] = React.useState(searchParams.get("propertyType") ?? "")

  function applyFilters(e?: React.FormEvent) {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (propertyType) params.set("propertyType", propertyType)
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearFilters() {
    setLocation("")
    setMinPrice("")
    setMaxPrice("")
    setPropertyType("")
    router.push(pathname)
  }

  return (
    <Card className="h-fit lg:sticky lg:top-24">
      <CardContent>
        <form onSubmit={applyFilters} className="flex flex-col gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              placeholder="Min price"
            />
            <Input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              placeholder="Max price"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((t) => (
              <Badge
                key={t}
                variant={propertyType === t ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setPropertyType(propertyType === t ? "" : t)}
              >
                {t}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 rounded-full">Apply Filters</Button>
            <Button type="button" variant="outline" onClick={clearFilters} className="rounded-full">
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
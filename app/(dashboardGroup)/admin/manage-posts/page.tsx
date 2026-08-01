import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Eye, Plus } from "lucide-react"
import { getAllProperties } from "../../_actions/admin"
import { DeleteAllButton } from "./delete-all-button"
import { DeletePropertyButton } from "../properties/delete-property-button"
import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/types/auth"

export default async function AdminManagePostsPage() {
  const result = await getAllProperties()
  const properties = result.data || []

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage All Posts</h1>
        <Button asChild>
          <Link href="/landlord/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Properties ({properties.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {properties.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No properties found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="border rounded-lg overflow-hidden">
                    <div className="relative h-48 w-full bg-muted">
                      <Image 
                        src={property.images[0] || "/placeholder-property.jpg"} 
                        alt={property.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link href={`/properties/${property.id}`} className="font-medium hover:underline">
                            {property.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <p className="text-sm font-semibold text-emerald-600">${property.price}/mo</p>
                        </div>
                        <Badge variant={property.availability === "AVAILABLE" ? "default" : "secondary"}>
                          {property.availability}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/properties/${property.id}`}>
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                        <DeletePropertyButton propertyId={property.id} title={property.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="text-red-800">
                    <strong>Danger Zone:</strong> Deleting all properties will permanently remove all listings from the platform.
                  </div>
                </div>
                <DeleteAllButton count={properties.length} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

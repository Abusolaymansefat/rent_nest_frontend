import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye } from "lucide-react"
import { getAllProperties, removeProperty } from "../../_actions/admin"
// import { DeletePropertyButton } from "./delete-property-button"
import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/types/auth"
import { DeletePropertyButton } from "./delete-property-button"

export default async function AdminPropertiesPage() {
  const properties = await getAllProperties()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Manage Properties</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Properties ({properties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No properties found.</p>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center gap-4 border-b py-4 last:border-b-0">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image 
                      src={property.images[0] || "/placeholder-property.jpg"} 
                      alt={property.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link href={`/properties/${property.id}`} className="font-medium hover:underline">
                      {property.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{property.location} · ${property.price}/mo</p>
                    <p className="text-xs text-muted-foreground">Landlord: {property.landlord.name}</p>
                  </div>

                  <Badge variant={property.availability === "AVAILABLE" ? "default" : "secondary"}>
                    {property.availability}
                  </Badge>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeletePropertyButton propertyId={property.id} title={property.title} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

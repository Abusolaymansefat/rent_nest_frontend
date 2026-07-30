import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Ruler, MapPin, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Property } from "@/types/auth"

export function PropertyCard({ property }: { property: Property }) {
  const isAvailable = property.availability === "AVAILABLE"

  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <Card className="overflow-hidden py-0 transition-shadow hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={property.images[0] || "/placeholder-property.jpg"}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!isAvailable && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              {property.availability === "RENTED" ? "Rented" : "Unavailable"}
            </Badge>
          )}
        </div>

        <CardContent className="space-y-2 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="line-clamp-1 text-lg font-semibold">{property.title}</h3>
            <span className="whitespace-nowrap text-lg font-bold text-emerald-600">
              ${property.price.toLocaleString()}/mo
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</span>
            <span className="flex items-center gap-1"><Ruler size={14} /> {property.size} sqft</span>
          </div>

          {property.totalReviews > 0 && (
            <div className="flex items-center gap-1 pt-1 text-sm">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({property.totalReviews})</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
import Image from "next/image"
import { notFound } from "next/navigation"
import { Bed, Bath, Ruler, MapPin, Phone, Star, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPropertyById } from "../../_actions/properties"
import { RequestToRentButton } from "../../_components/properties/request-to-rent-button"
// import { getPropertyById } from "@/service/properties"
// import { RequestToRentButton } from "@/components/properties/request-to-rent-button"

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getPropertyById(id)

  if (!property) notFound()

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="relative mb-4 h-96 w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={property.images[0] || "/placeholder-property.jpg"}
              alt={property.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>

          {property.images.length > 1 && (
            <div className="mb-6 grid grid-cols-4 gap-3">
              {property.images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative h-24 overflow-hidden rounded-xl bg-muted">
                  <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <Badge variant="secondary" className="shrink-0 gap-1">
              <Tag size={14} /> {property.category.name}
            </Badge>
          </div>

          <div className="mt-1 flex items-center gap-1 text-muted-foreground">
            <MapPin size={16} />
            {property.location} — {property.address}
          </div>

          {property.totalReviews > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.averageRating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({property.totalReviews} reviews)</span>
            </div>
          )}

          <div className="mt-4 flex gap-6 border-y py-4 text-sm">
            <span className="flex items-center gap-2"><Bed size={18} /> {property.bedrooms} Bedrooms</span>
            <span className="flex items-center gap-2"><Bath size={18} /> {property.bathrooms} Bathrooms</span>
            <span className="flex items-center gap-2"><Ruler size={18} /> {property.size} sqft</span>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <p className="leading-relaxed text-muted-foreground">{property.description}</p>
          </div>

          {property.amenities.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-xl font-semibold">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <Badge key={a} variant="outline">{a}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Card className="h-fit">
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold text-emerald-600">
              ${property.price.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground">/mo</span>
            </p>

            <div className="flex items-center gap-3 border-t pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
                {property.landlord.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{property.landlord.name}</p>
                <p className="text-sm text-muted-foreground">Landlord</p>
              </div>
            </div>

            {property.landlord.phone && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} /> {property.landlord.phone}
              </p>
            )}

            <RequestToRentButton propertyId={property.id} availability={property.availability} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
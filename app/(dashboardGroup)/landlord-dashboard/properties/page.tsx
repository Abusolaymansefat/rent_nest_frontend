import Link from "next/link"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getMyProperties } from "../../_actions/landlord"
import { LandlordPropertyRow } from "../../_components/landlord/landlord-property-row"


export default async function LandlordPropertiesPage() {
  const properties = await getMyProperties()

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Button asChild className="rounded-full">
          <Link href="/dashboard/landlord/properties/new">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          {properties.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              You haven&apos;t listed any properties yet.
            </p>
          ) : (
            properties.map((p) => <LandlordPropertyRow key={p.id} property={p} />)
          )}
        </CardContent>
      </Card>
    </div>
  )
}
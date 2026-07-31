import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getAllProperties, getAllRequests, removeProperty } from "../../_actions/admin"
import { StatusBadge } from "../../_components/rentals/status-badge"


export default async function ModerationPage() {
  const [properties, requests] = await Promise.all([getAllProperties(), getAllRequests()])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-6 text-3xl font-bold">Content Moderation</h1>

        <h2 className="mb-3 text-xl font-semibold">All Listings</h2>
        <Card>
          <CardContent>
            {properties.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground">No listings found.</p>
            ) : (
              properties.map((p) => (
                <div key={p.id} className="flex items-center gap-4 border-b py-4 last:border-b-0">
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={p.images[0] || "/placeholder-property.jpg"} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/properties/${p.id}`} className="font-medium hover:underline">{p.title}</Link>
                    <p className="text-sm text-muted-foreground">{p.location} · {p.landlord.name}</p>
                  </div>
                  <Badge variant={p.availability === "AVAILABLE" ? "default" : "secondary"}>
                    {p.availability}
                  </Badge>
                  <RemovePropertyButton propertyId={p.id} title={p.title} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-semibold">All Rental Requests</h2>
        <Card>
          <CardContent>
            {requests.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground">No requests found.</p>
            ) : (
              requests.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-4 border-b py-3 last:border-b-0">
                  <div>
                    <p className="font-medium">{r.property.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Move-in: {new Date(r.moveInDate).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RemovePropertyButton({ propertyId, title }: { propertyId: string; title: string }) {
  async function handleRemove() {
    "use server"
    await removeProperty(propertyId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove &quot;{title}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This listing will be permanently removed from the platform. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={handleRemove}>
            <AlertDialogAction type="submit" className="bg-red-600 hover:bg-red-700">
              Remove
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
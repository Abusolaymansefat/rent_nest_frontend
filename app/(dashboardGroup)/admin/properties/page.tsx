import { Card, CardContent } from "@/components/ui/card"
import { getCurrentUser } from "@/service/auth"

export default async function AdminPropertiesPage() {
  const user = await getCurrentUser()

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Manage Properties</h1>

      <Card>
        <CardContent className="py-10">
          <p className="text-center text-muted-foreground">
            Properties management functionality coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

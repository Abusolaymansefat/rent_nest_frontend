import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/service/auth"

export default async function LandlordProfilePage() {
  const user = await getCurrentUser()

  if (!user) return null

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Landlord Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Role</label>
            <p className="text-lg">{user.role}</p>
          </div>
          {user.phone && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-lg">{user.phone}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

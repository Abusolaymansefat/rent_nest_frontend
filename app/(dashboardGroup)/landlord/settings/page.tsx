import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/service/auth"

export default async function LandlordSettingsPage() {
  const user = await getCurrentUser()

  if (!user) return null

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser } from "@/service/auth"

export default async function AdminAvatarPage() {
  const user = await getCurrentUser()

  if (!user) return null

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Avatar Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current Avatar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar ?? undefined} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <p className="text-muted-foreground">Avatar upload functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}

import type { CurrentUser } from "@/types/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader({ user, title }: { user: CurrentUser; title: string }) {
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <Avatar className="h-11 w-11">
        <AvatarImage src={user.avatar ?? undefined} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  )
}
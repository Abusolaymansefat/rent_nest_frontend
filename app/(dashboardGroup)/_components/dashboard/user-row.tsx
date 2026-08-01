"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Ban, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PlatformUser } from "@/types/auth"
import { updateUserStatus } from "../../_actions/admin"


export function UserRow({ user }: { user: PlatformUser }) {
  const [status, setStatus] = useState(user.status)
  const [isPending, startTransition] = useTransition()

  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
  const isBanned = status === "BANNED"

  function handleToggle() {
    const previous = status
    const next = isBanned ? "ACTIVE" : "BANNED"
    setStatus(next) // optimistic

    startTransition(async () => {
      const result = await updateUserStatus(user.id, next)
      if (!result.success) {
        setStatus(previous)
        toast.error(result.message || "Could not update user")
      } else {
        toast.success(next === "BANNED" ? "User banned" : "User unbanned")
      }
    })
  }

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar ?? undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 pr-4">
        <Badge variant="outline">{user.role}</Badge>
      </td>
      <td className="py-3 pr-4">
        <Badge variant={isBanned ? "destructive" : "default"}>
          {isBanned ? "Banned" : "Active"}
        </Badge>
      </td>
      <td className="py-3 pr-4 text-sm text-muted-foreground">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="py-3 text-right">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant={isBanned ? "outline" : "destructive"}
              disabled={isPending || user.role === "ADMIN"}
            >
              {isBanned ? <CheckCircle className="mr-1 h-4 w-4" /> : <Ban className="mr-1 h-4 w-4" />}
              {isBanned ? "Unban" : "Ban"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{isBanned ? "Unban this user?" : "Ban this user?"}</AlertDialogTitle>
              <AlertDialogDescription>
                {isBanned
                  ? `${user.name} will regain access to the platform.`
                  : `${user.name} will lose access to the platform immediately.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleToggle} className={isBanned ? "" : "bg-red-600 hover:bg-red-700"}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  )
}
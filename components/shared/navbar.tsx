"use client"

import Link from "next/link"
import {
  Bell, Building2, Heart, House, LogOut, Menu, Search, Settings, User, LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { CurrentUser } from "@/types/auth"
import { logoutAction } from "@/service/auth"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

const navLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Categories", href: "/categories", icon: Building2 }
]

const dashboardHrefByRole: Record<string, string> = {
  TENANT: "/tenant-dashboard",
  LANDLORD: "/landlord-dashboard",
  ADMIN: "/admin-dashboard",
}

export default function Navbar({ user }: { user: CurrentUser | null }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const isLoggedIn = !!user
  const dashboardHref = user ? dashboardHrefByRole[user.role] ?? "/dashboard" : "/dashboard"

  const initials = user?.name
    ? user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await logoutAction()
      toast.success("Logout successful")
      router.push("/login")
      router.refresh()
    } catch {
      toast.error("Logout failed. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-600">
          <House size={32} />
          RentNest
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 text-base font-semibold text-muted-foreground hover:text-emerald-600 transition"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">

          {/* Search */}
          <div className="relative hidden xl:block">
            <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
            <Input placeholder="Search properties..." className="w-72 pl-10 py-2.5 text-base" />
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="lg">🌙</Button>

          {/* Notification */}
          {isLoggedIn && (
            <Button variant="ghost" size="lg">
              <Bell size={22} />
            </Button>
          )}

          {/* User Menu */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={dashboardHref}>
                    <LayoutDashboard className="mr-2 h-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/saved-properties">
                    <Heart className="mr-2 h-4" />
                    Saved Properties
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                  className="text-red-500 cursor-pointer"
                  onSelect={() => handleLogout()}
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 h-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="lg">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-5">
                {navLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 text-xl">
                      <Icon size={22} />
                      {item.name}
                    </Link>
                  )
                })}

                <hr />

                {isLoggedIn ? (
                  <>
                    <Link href={dashboardHref} className="flex gap-3 items-center">
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => handleLogout()}
                      disabled={isLoggingOut}
                    >
                      <LogOut />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
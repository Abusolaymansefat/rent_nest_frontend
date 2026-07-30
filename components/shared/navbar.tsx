"use client"

import Link from "next/link"
import {
  Building2,
  Heart,
  House,
  LogOut,
  Menu,
  Settings,
  User,
  LayoutDashboard,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CurrentUser } from "@/types/auth"
import { logoutAction } from "@/service/logout"
// import { logoutAction } from "@/service/auth"

// --- Types ---
type NavbarProps = {
  user: CurrentUser | null
}

// --- Config ---
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

// --- Component ---
export default function Navbar({ user }: NavbarProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const isLoggedIn = !!user
  const dashboardHref = user?.role
    ? dashboardHrefByRole[user.role] ?? "/dashboard"
    : "/dashboard"

  // User display info
  const displayName = user?.name ?? "Guest"
  const displayEmail = user?.email ?? "Not signed in"
  const avatarUrl = user?.avatar || undefined

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "?"

  // Logout handler
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logoutAction()
      toast.success("Logout successful")
      setMobileOpen(false)
      router.push("/login")
      router.refresh()
    } catch {
      toast.error("Logout failed. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Menu action handler
  const handleMenuAction = (action: "profile" | "settings") => {
    if (!isLoggedIn) {
      toast.error("Please login first")
      router.push("/login")
      return
    }
    if (action === "profile") {
      router.push(`${dashboardHref}/profile`)
      return
    }
    toast.info("Settings coming soon")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-emerald-600"
        >
          <House size={32} />
          RentNest
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-base font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-emerald-600"
              >
                <Icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-12 gap-3 rounded-full px-3 hover:bg-muted"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-10 border-2 border-primary/20">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold leading-none">
                      {displayName}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {displayEmail}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60">
                {/* User Info Header */}
                <div className="flex flex-col px-2 py-2">
                  <span className="text-sm font-semibold text-foreground">
                    {displayName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {displayEmail}
                  </span>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => handleMenuAction("profile")}>
                    <User className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={dashboardHref}>
                      <LayoutDashboard className="mr-2 size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/saved-properties">
                      <Heart className="mr-2 size-4" />
                      Saved Properties
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleMenuAction("settings")}>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  {isLoggingOut ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 size-4" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Log out"}
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
        <div className="flex items-center gap-2 md:hidden">
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-9 border-2 border-primary/20">
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="text-xs font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col px-2 py-2">
                  <span className="text-sm font-semibold text-foreground">
                    {displayName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {displayEmail}
                  </span>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => handleMenuAction("profile")}>
                  <User className="mr-2 size-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={dashboardHref}>
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/saved-properties">
                    <Heart className="mr-2 size-4" />
                    Saved
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  {isLoggingOut ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 size-4" />
                  )}
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80">
              <div className="mt-8 flex flex-col gap-2">
                {navLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Icon size={22} />
                        {item.name}
                      </Link>
                    </SheetClose>
                  )
                })}

                <hr className="my-2" />

                {!isLoggedIn ? (
                  <div className="flex flex-col gap-3 px-2">
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="lg" asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 px-2">
                    <Button
                      variant="destructive"
                      size="lg"
                      disabled={isLoggingOut}
                      onClick={handleLogout}
                    >
                      {isLoggingOut ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <LogOut className="mr-2 size-4" />
                      )}
                      {isLoggingOut ? "Logging out..." : "Log out"}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
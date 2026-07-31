"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { dashboardNavByRole } from "./dashboard-nav-config"
import type { Role } from "@/types/auth"

export function DashboardMobileNav({ role }: { role: Role }) {
  const pathname = usePathname()
  const navItems = dashboardNavByRole[role]

  return (
    <div className="sticky top-20 z-40 border-b bg-background/80 px-4 py-2 backdrop-blur-md md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Menu className="mr-2 h-4 w-4" />
            Dashboard Menu
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <div className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
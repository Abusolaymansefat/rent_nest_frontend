"use client"

import Link from "next/link"
import { useState } from "react"

import {
    Bell, Building2, Heart, House, LogOut, Menu, Search, Settings, User, LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"


import { Input } from "@/components/ui/input"


const navLinks = [
    {
        name: "Home",
        href: "/",
        icon: House,
    },
    {
        name: "Properties",
        href: "/properties",
        icon: Building2,
    },
    {
        name: "Categories",
        href: "/categories",
        icon: Building2,
    },
    {
        name: "About",
        href: "/about",
        icon: User,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: User,
    },
]


export default function Navbar() {

    // Temporary auth state
    // Replace with NextAuth/JWT later
    const [user] = useState({
        name: "Abu Solayman",
        email: "user@gmail.com",
        image: "",
        loggedIn: true,
    })


    return (

        <header
            className="
      sticky top-0 z-50
      w-full
      border-b
      bg-background/80
      backdrop-blur-md
      "
        >

            <div
                className="
        container mx-auto
        flex
        h-16
        items-center
        justify-between
        px-4
        "
            >


                {/* Logo */}

                <Link
                    href="/"
                    className="
          flex
          items-center
          gap-2
          text-xl
          font-bold
          text-emerald-600
          "
                >

                    <House
                        size={28}
                    />

                    RentNest

                </Link>



                {/* Desktop Navigation */}

                <nav
                    className="
          hidden
          lg:flex
          items-center
          gap-7
          "
                >

                    {
                        navLinks.map((item) => {

                            const Icon = item.icon

                            return (

                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-muted-foreground
                  hover:text-emerald-600
                  transition
                  "
                                >

                                    <Icon size={16} />

                                    {item.name}

                                </Link>

                            )

                        })
                    }


                </nav>





                {/* Right Section */}

                <div
                    className="
          hidden
          md:flex
          items-center
          gap-3
          "
                >


                    {/* Search */}

                    <div
                        className="
            relative
            hidden
            xl:block
            "
                    >

                        <Search
                            size={18}
                            className="
              absolute
              left-3
              top-2.5
              text-muted-foreground
              "
                        />

                        <Input
                            placeholder="
              Search properties...
              "
                            className="
              w-64
              pl-10
              "
                        />

                    </div>




                    {/* Theme Toggle */}

                    <Button
                        variant="ghost"
                        size="icon"
                    >

                        🌙

                    </Button>





                    {/* Notification */}

                    {
                        user.loggedIn && (

                            <Button
                                variant="ghost"
                                size="icon"
                            >

                                <Bell
                                    size={20}
                                />

                            </Button>

                        )
                    }






                    {/* User Menu */}


                    {
                        user.loggedIn ? (

                            <DropdownMenu>

                                <DropdownMenuTrigger asChild>

                                    <Button
                                        variant="ghost"
                                        className="
                    rounded-full
                    "
                                    >

                                        <Avatar>

                                            <AvatarImage
                                                src={user.image}
                                            />

                                            <AvatarFallback>

                                                AS

                                            </AvatarFallback>


                                        </Avatar>


                                    </Button>


                                </DropdownMenuTrigger>



                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >

                                    <DropdownMenuItem>

                                        <User className="mr-2 h-4" />

                                        Profile

                                    </DropdownMenuItem>



                                    <DropdownMenuItem>

                                        <LayoutDashboard
                                            className="mr-2 h-4"
                                        />

                                        Dashboard

                                    </DropdownMenuItem>



                                    <DropdownMenuItem>

                                        <Heart
                                            className="mr-2 h-4"
                                        />

                                        Saved Properties

                                    </DropdownMenuItem>




                                    <DropdownMenuItem>

                                        <Settings
                                            className="mr-2 h-4"
                                        />

                                        Settings

                                    </DropdownMenuItem>



                                    <DropdownMenuSeparator />




                                    <DropdownMenuItem
                                        className="
                    text-red-500
                    "
                                    >

                                        <LogOut
                                            className="mr-2 h-4"
                                        />

                                        Logout

                                    </DropdownMenuItem>


                                </DropdownMenuContent>


                            </DropdownMenu>


                        )

                            :

                            (

                                <div
                                    className="
                flex
                gap-2
                "
                                >

                                    <Button
                                        variant="outline"
                                        asChild
                                    >

                                        <Link href="/login">

                                            Login

                                        </Link>


                                    </Button>



                                    <Button
                                        asChild
                                    >

                                        <Link href="/register">

                                            Register

                                        </Link>


                                    </Button>


                                </div>


                            )
                    }



                </div>








                {/* Mobile Menu */}


                <div
                    className="
          md:hidden
          "
                >


                    <Sheet>


                        <SheetTrigger asChild>

                            <Button
                                variant="ghost"
                                size="icon"
                            >

                                <Menu />

                            </Button>


                        </SheetTrigger>




                        <SheetContent
                            side="right"
                        >


                            <div
                                className="
                mt-8
                flex
                flex-col
                gap-5
                "
                            >


                                {
                                    navLinks.map((item) => {

                                        const Icon = item.icon


                                        return (

                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="
                        flex
                        items-center
                        gap-3
                        text-lg
                        "
                                            >

                                                <Icon size={20} />

                                                {item.name}

                                            </Link>

                                        )

                                    })
                                }

                                <hr />

                                {
                                    user.loggedIn ? (

                                        <>

                                            <Link
                                                href="/dashboard"
                                                className="
                      flex
                      gap-3
                      items-center
                      "
                                            >
                                                <LayoutDashboard />
                                                Dashboard
                                            </Link>
                                            <Button
                                                variant="destructive"
                                            >
                                                <LogOut />
                                                Logout
                                            </Button>
                                        </>
                                    )
                                        : (
                                            <>
                                                <Button asChild>

                                                    <Link href="/login">
                                                        Login
                                                    </Link>

                                                </Button>
                                                <Button asChild>
                                                    <Link href="/register">
                                                        Register
                                                    </Link>
                                                </Button>
                                            </>
                                        )
                                }
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </header>


    )
}
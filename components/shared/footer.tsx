"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, House } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const propertyLinks = [
  { name: "Apartments", href: "/properties?type=apartment" },
  { name: "Houses", href: "/properties?type=house" },
  { name: "Rooms", href: "/properties?type=room" },
  { name: "Luxury Homes", href: "/properties?type=luxury" },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-gray-300">
      <div className="container mx-auto px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <House className="text-emerald-500" />
              RentNest
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Find your perfect rental home with RentNest. Discover apartments,
              houses and rooms easily.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2.5 text-gray-300 hover:bg-emerald-600 hover:text-white transition-all duration-200 border border-slate-700/60"
              >
                <IconBrandFacebook size={18} />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2.5 text-gray-300 hover:bg-emerald-600 hover:text-white transition-all duration-200 border border-slate-700/60"
              >
                <IconBrandTwitter size={18} />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2.5 text-gray-300 hover:bg-emerald-600 hover:text-white transition-all duration-200 border border-slate-700/60"
              >
                <IconBrandInstagram size={18} />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2.5 text-gray-300 hover:bg-emerald-600 hover:text-white transition-all duration-200 border border-slate-700/60"
              >
                <IconBrandLinkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Properties
            </h3>
            <ul className="space-y-3">
              {propertyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                Dhaka, Bangladesh
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                +880 1234-567890
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                support@rentnest.com
              </p>
            </div>

            <h4 className="mb-3 mt-6 font-medium text-white">
              Subscribe Newsletter
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 focus-visible:ring-emerald-500"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 bg-slate-950/50">
        <div className="container mx-auto flex flex-col gap-3 px-5 py-6 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear ?? 2026} RentNest. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-emerald-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
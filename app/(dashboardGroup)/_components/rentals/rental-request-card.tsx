"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Star, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import { RentalRequest } from "@/types/auth"

export function RentalRequestCard({ request }: { request: RentalRequest }) {
  const propertyTitle = request?.property?.title ?? "Untitled Property"
  const propertyLocation = request?.property?.location ?? "Location specified upon request"
  const imageSrc = request?.property?.images?.[0] || "/placeholder-property.jpg"

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-gradient-to-r from-white via-slate-50/50 to-emerald-50/20 shadow-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
          
          {/* Animated Property Thumbnail */}
          <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-36">
            <Image
              src={imageSrc}
              alt={propertyTitle}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3 sm:hidden">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {propertyTitle}
              </h3>
              <StatusBadge status={request?.status} />
            </div>

            <h3 className="hidden text-base font-bold text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 dark:text-slate-100 sm:block">
              {propertyTitle}
            </h3>

            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {propertyLocation}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1 rounded-md bg-emerald-100/80 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                <Calendar size={13} className="animate-pulse text-emerald-600" />
                Move-in: {request?.moveInDate ? new Date(request.moveInDate).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>

          {/* Aligned Status & Action Section */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
            {/* Desktop Status Badge Alignment */}
            <div className="hidden sm:block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <StatusBadge status={request?.status} />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div>
              {request?.status === "APPROVED" && (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    asChild 
                    className="relative overflow-hidden rounded-full bg-emerald-600 px-6 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-500/40"
                  >
                    <Link href={`/tenant/requests/${request.id}/pay`} className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      <span>Pay Now</span>
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              )}

              {request?.status === "COMPLETED" && (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="rounded-full border-2 border-emerald-500/30 px-6 font-semibold text-emerald-700 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
                  >
                    <Link href={`/tenant/requests/${request.id}/review`} className="flex items-center gap-2">
                      <Star size={15} className="fill-emerald-500 text-emerald-500" />
                      <span>Leave Review</span>
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}
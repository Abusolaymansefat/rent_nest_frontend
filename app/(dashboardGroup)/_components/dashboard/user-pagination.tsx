"use client"

import Link from "next/link"
import { useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function UserPagination({ page, totalPages }: { page: number; totalPages: number }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function buildHref(targetPage: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(targetPage))
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Button asChild variant="outline" size="sm" disabled={page <= 1}>
        <Link href={buildHref(page - 1)} aria-disabled={page <= 1}>Previous</Link>
      </Button>
      <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
      <Button asChild variant="outline" size="sm" disabled={page >= totalPages}>
        <Link href={buildHref(page + 1)} aria-disabled={page >= totalPages}>Next</Link>
      </Button>
    </div>
  )
}
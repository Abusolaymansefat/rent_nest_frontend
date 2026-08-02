import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PropertyPagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number
  totalPages: number
  buildHref: (page: number) => string
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Button asChild variant="outline" size="icon" disabled={page <= 1}>
        <Link href={buildHref(page - 1)} aria-disabled={page <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          asChild
          variant={p === page ? "default" : "outline"}
          size="icon"
          className="rounded-full"
        >
          <Link href={buildHref(p)}>{p}</Link>
        </Button>
      ))}

      <Button asChild variant="outline" size="icon" disabled={page >= totalPages}>
        <Link href={buildHref(page + 1)} aria-disabled={page >= totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
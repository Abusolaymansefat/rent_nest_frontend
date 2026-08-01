"use client"

import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { useState } from "react"
import { deleteAllProperties } from "../../_actions/admin"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DeleteAllButton({ count }: { count: number }) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL properties? This action cannot be undone!')) {
      return
    }

    try {
      setDeleting(true)
      const result = await deleteAllProperties()
      if (result.success) {
        toast.success('All properties deleted successfully')
        router.refresh()
      } else {
        toast.error(result.message || 'Failed to delete properties')
      }
    } catch {
      toast.error('Failed to delete properties')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Button
      onClick={handleDeleteAll}
      variant="destructive"
      className="w-full"
      disabled={deleting || count === 0}
    >
      {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <Trash2 className="mr-2 h-4 w-4" />
      Delete All Properties ({count})
    </Button>
  )
}

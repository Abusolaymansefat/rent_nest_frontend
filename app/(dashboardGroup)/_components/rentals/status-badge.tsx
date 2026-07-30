import { Badge } from "@/components/ui/badge"
import { RentalRequestStatus } from "@/types/auth"

const statusStyles: Record<RentalRequestStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  APPROVED: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
  ACTIVE: "bg-green-100 text-green-700 hover:bg-green-100",
  COMPLETED: "bg-gray-100 text-gray-700 hover:bg-gray-100",
}

export function StatusBadge({ status }: { status: RentalRequestStatus }) {
  return <Badge className={statusStyles[status]}>{status}</Badge>
}
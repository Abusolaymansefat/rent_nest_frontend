import { getMyRentalRequests } from "@/app/(dashboardGroup)/_actions/rentals"
import { ReviewForm } from "@/app/(dashboardGroup)/_components/rentals/review-form"
import { notFound, redirect } from "next/navigation"
// import { getMyRentalRequests } from "@/service/rentals"
// import { ReviewForm } from "@/components/dashboard/review-form"

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const requests = await getMyRentalRequests()
  const request = requests.find((r) => r.id === id)

  if (!request) notFound()
  if (request.status !== "ACTIVE" && request.status !== "COMPLETED") {
    redirect("/dashboard/tenant")
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold">Leave a Review</h1>
      <p className="mb-6 text-muted-foreground">{request.property.title}</p>
      <ReviewForm propertyId={request.propertyId} />
    </div>
  )
}
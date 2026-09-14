import { CreditCard, DollarSign, UserRound } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllPayments } from "../../_actions/admin"
import { UserPagination } from "../../_components/dashboard/user-pagination"

function formatCurrency(amount: number) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

function formatDate(value: string | null | undefined) {
      if (!value) return "-"
      return new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
      }).format(new Date(value))
}

function statusVariant(status: string) {
      const normalized = status.toUpperCase()
      if (normalized === "COMPLETED" || normalized === "PAID") return "default" as const
      if (normalized === "FAILED") return "destructive" as const
      return "secondary" as const
}

export default async function AdminPaymentsPage({
      searchParams,
}: {
      searchParams: Promise<{ status?: string; page?: string }>
}) {
      const params = await searchParams
      const response = await getAllPayments({ status: params.status, page: params.page, limit: "20" })
      const payments = response.data ?? []
      const meta = response.meta
      const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1
      const completedOnPage = payments.filter((payment) => {
            const status = payment.status.toUpperCase()
            return status === "COMPLETED" || status === "PAID"
      }).length
      const pageTotal = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)

      return (
            <>
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                              <h1 className="text-3xl font-bold">Payment History</h1>
                              <p className="mt-1 text-muted-foreground">Review every tenant payment and transaction detail.</p>
                        </div>
                        <form className="flex items-center gap-2" method="get">
                              <label className="sr-only" htmlFor="payment-status">Filter by status</label>
                              <select
                                    id="payment-status"
                                    name="status"
                                    defaultValue={params.status ?? ""}
                                    className="h-9 rounded-md border bg-background px-3 text-sm"
                              >
                                    <option value="">All statuses</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="FAILED">Failed</option>
                              </select>
                              <Button type="submit" size="sm">Filter</Button>
                        </form>
                  </div>

                  <div className="mb-6 grid gap-4 sm:grid-cols-3">
                        <Card>
                              <CardContent className="flex items-center gap-3 py-5">
                                    <CreditCard className="h-5 w-5 text-blue-600" />
                                    <div><p className="text-2xl font-bold">{meta?.total ?? payments.length}</p><p className="text-sm text-muted-foreground">Total records</p></div>
                              </CardContent>
                        </Card>
                        <Card>
                              <CardContent className="flex items-center gap-3 py-5">
                                    <DollarSign className="h-5 w-5 text-emerald-600" />
                                    <div><p className="text-2xl font-bold">{formatCurrency(pageTotal)}</p><p className="text-sm text-muted-foreground">Current page total</p></div>
                              </CardContent>
                        </Card>
                        <Card>
                              <CardContent className="flex items-center gap-3 py-5">
                                    <UserRound className="h-5 w-5 text-violet-600" />
                                    <div><p className="text-2xl font-bold">{completedOnPage}</p><p className="text-sm text-muted-foreground">Completed on page</p></div>
                              </CardContent>
                        </Card>
                  </div>

                  <Card>
                        <CardHeader><CardTitle>All Transactions</CardTitle></CardHeader>
                        <CardContent>
                              {!response.success && payments.length === 0 ? (
                                    <p className="py-10 text-center text-muted-foreground">{response.message || "Could not load payment history."}</p>
                              ) : payments.length === 0 ? (
                                    <p className="py-10 text-center text-muted-foreground">No payment records found.</p>
                              ) : (
                                    <div className="overflow-x-auto">
                                          <table className="w-full min-w-262.5 text-left text-sm">
                                                <thead>
                                                      <tr className="border-b text-muted-foreground">
                                                            <th className="pb-3 pr-4 font-medium">Tenant</th>
                                                            <th className="pb-3 pr-4 font-medium">Property</th>
                                                            <th className="pb-3 pr-4 font-medium">Amount</th>
                                                            <th className="pb-3 pr-4 font-medium">Status</th>
                                                            <th className="pb-3 pr-4 font-medium">Provider</th>
                                                            <th className="pb-3 pr-4 font-medium">Created</th>
                                                            <th className="pb-3 font-medium">Transaction ID</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {payments.map((payment) => (
                                                            <tr key={payment.id} className="border-b align-top last:border-0">
                                                                  <td className="py-4 pr-4">
                                                                        <p className="font-medium">{payment.tenant?.name || "Unknown tenant"}</p>
                                                                        <p className="text-xs text-muted-foreground">{payment.tenant?.email || payment.tenantId}</p>
                                                                        {payment.tenant?.phone && <p className="text-xs text-muted-foreground">{payment.tenant.phone}</p>}
                                                                  </td>
                                                                  <td className="py-4 pr-4">
                                                                        <p className="font-medium">{payment.rentalRequest?.property?.title || "Unknown property"}</p>
                                                                        <p className="text-xs text-muted-foreground">{payment.rentalRequest?.property?.location || "-"}</p>
                                                                        <p className="text-xs text-muted-foreground">Landlord: {payment.rentalRequest?.property?.landlord?.name || "-"}</p>
                                                                  </td>
                                                                  <td className="py-4 pr-4 font-semibold">{formatCurrency(Number(payment.amount || 0))}</td>
                                                                  <td className="py-4 pr-4"><Badge variant={statusVariant(payment.status)}>{payment.status}</Badge></td>
                                                                  <td className="py-4 pr-4">{payment.provider}</td>
                                                                  <td className="whitespace-nowrap py-4 pr-4">{formatDate(payment.createdAt)}<br /><span className="text-xs text-muted-foreground">Paid: {formatDate(payment.paidAt)}</span></td>
                                                                  <td className="max-w-45 truncate py-4 font-mono text-xs" title={payment.transactionId}>{payment.transactionId}</td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              )}
                        </CardContent>
                  </Card>

                  {meta && <UserPagination page={meta.page} totalPages={totalPages} />}
            </>
      )
}

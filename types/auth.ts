export type Role = "TENANT" | "LANDLORD" | "ADMIN"
export type UserStatus = "ACTIVE" | "BANNED"

export type FormState = {
  success: boolean
  message?: string
}

export type CurrentUser = {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  role: Role
}

export type RegisterApiResponse = {
  success: boolean
  statusCode: number
  message: string
  data?: {
    id: string
    name: string
    email: string
    phone: string | null
    avatar: string | null
    role: Role
    createdAt: string
  }
}

export type LoginApiResponse = {
  success: boolean
  statusCode: number
  message: string
  data?: {
    accessToken: string
    refreshToken: string
    user?: {
      id: string
      name: string
      email: string
      phone: string | null
      avatar: string | null
      role: Role
    }
  }
}

export type PropertyAvailability = "AVAILABLE" | "RENTED" | "UNAVAILABLE"

export type Property = {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  size: number
  propertyType: string
  availability: PropertyAvailability
  images: string[]
  amenities: string[]
  averageRating: number
  totalReviews: number
  landlordId: string
  categoryId: string
  landlord: {
    id: string
    name: string
    avatar: string | null
    phone: string | null
  }
  category: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export type PropertyFilters = {
  location?: string
  minPrice?: string
  maxPrice?: string
  propertyType?: string
  categoryId?: string
  page?: string
}

// meta তে totalPages ব্যাকএন্ড পাঠায় না — page/limit/total দিয়ে frontend এ হিসাব করতে হয়
export type PaginationMeta = {
  page: number
  limit: number
  total: number
}

export type PaginatedResponse<T> = {
  success: boolean
  message: string
  data: T[]
  meta?: PaginationMeta
}

export type RentalRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED"

export type RentalRequest = {
  id: string
  propertyId: string
  tenantId: string
  status: RentalRequestStatus
  moveInDate: string
  message: string | null
  createdAt: string
  property: {
    id: string
    title: string
    images: string[]
    price: number
    location: string
  }
  payment?: {
    id: string
    status: "PENDING" | "PAID" | "FAILED"
    amount: number
  } | null
}

export type Payment = {
  id: string
  rentalRequestId: string
  amount: number
  status: "PENDING" | "PAID" | "FAILED"
  createdAt: string
}

// ---------------- ADMIN ----------------

export type PlatformUser = {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  role: Role
  status: UserStatus
  createdAt: string
}

export type AdminDashboardStats = {
  totalUsers: number
  totalLandlords: number
  totalTenants: number
  totalProperties: number
  totalRentals: number
  totalCompletedRentals: number
}

export type UserQueryParams = {
  searchTerm?: string
  role?: string
  status?: UserStatus
  page?: string
  limit?: string
}

export type PropertyQueryParams = {
  searchTerm?: string
  location?: string
  availability?: PropertyAvailability
  page?: string
  limit?: string
}

export type RentalQueryParams = {
  status?: RentalRequestStatus
  page?: string
  limit?: string
}

export type Category = {
  id: string
  name: string
  slug: string
  icon: string | null
  createdAt: string
}

export type CategoryFormState = {
  success: boolean
  message?: string
}
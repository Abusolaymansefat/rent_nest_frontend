export type Role = "TENANT" | "LANDLORD" | "ADMIN"

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

export type Category = {
  id: string
  name: string
}

export type PropertyFilters = {
  location?: string
  minPrice?: string
  maxPrice?: string
  propertyType?: string
  categoryId?: string
  page?: string
}

export type PaginatedResponse<T> = {
  success: boolean
  message: string
  data: T[]
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
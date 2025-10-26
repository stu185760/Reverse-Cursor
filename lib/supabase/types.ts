export interface Profile {
  id: string
  email: string
  full_name: string
  role: "customer" | "vendor" | "admin"
  profile_photo_url?: string
  phone?: string
  location?: string
  bio?: string
  rating?: number
  total_reviews?: number
  created_at: string
  updated_at: string
}

export interface Ad {
  id: string
  user_id: string
  title: string
  description: string
  category: string
  location: string
  budget_min: number
  budget_max: number
  status: "open" | "closed" | "in_progress"
  created_at: string
  updated_at: string
}

export interface AdImage {
  id: string
  ad_id: string
  image_url: string
  display_order: number
  created_at: string
}

export interface Quote {
  id: string
  ad_id: string
  vendor_id: string
  amount: number
  description: string
  delivery_days: number
  status: "pending" | "accepted" | "rejected"
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  quote_id?: string
  content: string
  is_read: boolean
  created_at: string
}

export interface Review {
  id: string
  quote_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number
  comment: string
  created_at: string
}

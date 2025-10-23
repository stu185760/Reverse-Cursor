// NOTE: This is a lightweight, browser-only store intended for MVP demo purposes.

export type Role = "customer" | "vendor" | "admin"

export interface User {
  id: string
  role: Role
  name: string
  email: string
  verified?: boolean
  bio?: string
  image?: string
  // Vendor-specific fields
  rating?: number // Average rating (0-5)
  total_reviews?: number // Count of reviews
  portfolio_images?: string[] // Portfolio gallery
  specialties?: string[] // Categories they specialize in
  phone_number?: string
  business_name?: string
  years_experience?: number
  location?: string
}

export interface Review {
  id: string
  vendor_id: string
  customer_id: string
  rating: number // 1-5 stars
  comment: string
  created_at: number
}

export interface Category {
  id: string
  name: string
  slug: string
}

export type AdStatus = "open" | "closed" | "completed"

export interface Ad {
  id: string
  title: string
  description: string
  category: string // category slug
  images: string[]
  owner_id: string
  status: AdStatus
  created_at: number
  location?: string
  budget?: number
  price_from?: number
  price_to?: number
}

export type ResponseStatus = "new" | "accepted" | "rejected"

export interface AdResponse {
  id: string
  ad_id: string
  vendor_id: string
  message: string
  status: ResponseStatus
  created_at: number
  thread_id?: string
}

// NEW: Structured Quote System
export type QuoteStatus = "pending" | "accepted" | "rejected" | "withdrawn"

export interface Quote {
  id: string
  ad_id: string
  vendor_id: string
  price_inr: number // Price in Indian Rupees
  delivery_days: number // Estimated delivery time in days
  message: string // Detailed offer description
  status: QuoteStatus
  created_at: number
  updated_at: number
  thread_id?: string // Optional link to message thread
}

export interface Message {
  id: string
  thread_id: string
  sender_id: string
  text: string
  timestamp: number
}

export type TargetType = "ad" | "response" | "message"
export interface Flag {
  id: string
  target_type: TargetType
  target_id: string
  reason: string
  created_at: number
}

export interface Thread {
  id: string
  ad_id: string
  customer_id: string
  vendor_id: string
  created_at: number
  last_message_at: number
}

export interface VendorShopListing {
  id: string
  vendor_id: string
  title: string
  description: string
  category: string
  location?: string
  images: string[]
  tags?: string[]
  created_at: number
  status: "active" | "hidden"
}

export interface Classified {
  id: string
  vendor_id: string
  title: string
  description: string
  images: string[]
  category: string
  price?: number
  created_at: number
  status?: "active" | "hidden"
}

export interface DB {
  users: User[]
  categories: Category[]
  ads: Ad[]
  responses: AdResponse[]
  quotes: Quote[] // Structured quotes
  reviews: Review[] // Vendor reviews
  messages: Message[]
  threads: Thread[]
  flags: Flag[]
  vendor_shops?: VendorShopListing[]
  classifieds?: Classified[]
  // lightweight "session"
  currentUserId?: string
}

const KEY = "reverse-marketplace-db:v1"

function uid(prefix = "") {
  return `${prefix}${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`
}

export function loadDB(): DB {
  if (typeof window === "undefined") {
    // Next.js RSC may try to import; guard
    return seed()
  }
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    const seeded = seed()
    localStorage.setItem(KEY, JSON.stringify(seeded))
    return seeded
  }
  try {
    const parsed = JSON.parse(raw) as DB
    const cats = defaultCategories()
    parsed.categories = cats

    const valid = new Set(cats.map((c) => c.slug))
    const legacyMap: Record<string, string> = {
      "home-repairs": "others",
      "design-creative": "others",
      "software-it": "others",
      "events-media": "others",
      consulting: "others",
    }
    if (Array.isArray(parsed.ads)) {
      parsed.ads = parsed.ads.map((a) => ({
        ...a,
        category: valid.has(a.category) ? a.category : (legacyMap[a.category] ?? "others"),
      }))
    }

    if (!Array.isArray(parsed.vendor_shops)) {
      parsed.vendor_shops = []
    }
    if (!Array.isArray(parsed.classifieds)) {
      parsed.classifieds = []
    }
    if (!Array.isArray(parsed.quotes)) {
      parsed.quotes = []
    }
    if (!Array.isArray(parsed.reviews)) {
      parsed.reviews = []
    }
    if (Array.isArray(parsed.threads)) {
      parsed.threads = parsed.threads.map((t: any) => ({
        ...t,
        last_message_at: typeof t.last_message_at === "number" ? t.last_message_at : t.created_at,
      }))
    }
    return parsed
  } catch {
    const seeded = seed()
    localStorage.setItem(KEY, JSON.stringify(seeded))
    return seeded
  }
}

export function saveDB(db: DB) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(db))
}

function defaultCategories(): Category[] {
  return [
    { id: "cat-1", name: "Clothing", slug: "clothing" },
    { id: "cat-2", name: "Footwear", slug: "footwear" },
    { id: "cat-3", name: "Furniture", slug: "furniture" },
    { id: "cat-4", name: "Automobile", slug: "automobile" },
    { id: "cat-5", name: "Jewelry", slug: "jewelry" },
    { id: "cat-6", name: "Gifting", slug: "gifting" },
    { id: "cat-7", name: "Others", slug: "others" },
  ]
}

function seed(): DB {
  const customer: User = {
    id: "u-cust",
    role: "customer",
    name: "Riya Sharma",
    email: "riya@example.com",
    verified: true,
  }
  const vendor: User = {
    id: "u-vend",
    role: "vendor",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    verified: true,
    bio: "Experienced craftsman specializing in custom jewelry and gifting solutions.",
    rating: 4.8,
    total_reviews: 24,
    specialties: ["jewelry", "gifting"],
    business_name: "Mehta Crafts",
    years_experience: 8,
    location: "Mumbai",
    portfolio_images: [],
  }
  const admin: User = {
    id: "u-admin",
    role: "admin",
    name: "Priya Nair",
    email: "admin@example.com",
    verified: true,
  }

  const cats = defaultCategories()
  
  // Only include 1 sample ad to avoid confusion
  const ad1: Ad = {
    id: "ad-sample-1",
    title: "Custom Wedding Jewelry Design Needed",
    description: "Looking for an experienced jeweler to design custom wedding rings and necklace set. Budget: ₹50,000-₹80,000. Need within 2 months.",
    category: "jewelry",
    images: [],
    owner_id: customer.id,
    status: "open",
    created_at: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    location: "Mumbai",
    price_from: 50000,
    price_to: 80000,
  }

  return {
    users: [customer, vendor, admin],
    categories: cats,
    ads: [ad1], // Only 1 sample ad now
    responses: [],
    quotes: [], // Initialize quotes array
    reviews: [], // Initialize reviews array
    messages: [],
    threads: [], // last_message_at will be set on creation
    flags: [],
    vendor_shops: [], // initialize vendor shops
    classifieds: [],
    currentUserId: customer.id,
  }
}

// Session helpers
export function getCurrentUser(): User | undefined {
  const db = loadDB()
  return db.users.find((u) => u.id === db.currentUserId)
}
export function switchRole(newRole: Role) {
  const db = loadDB()
  // reuse seeded users for simplicity
  const user = db.users.find((u) => u.role === newRole)
  if (user) {
    db.currentUserId = user.id
    saveDB(db)
  }
  return getCurrentUser()
}

// Ads
export function listAds(params?: {
  q?: string
  category?: string
  sort?: "newest" | "budget-asc" | "budget-desc"
  location?: string
}) {
  const db = loadDB()
  let ads = [...db.ads]
  if (params?.category && params.category !== "all") {
    ads = ads.filter((a) => a.category === params.category)
  }
  if (params?.location && params.location !== "all") {
    // exact match as requested
    ads = ads.filter((a) => (a.location ?? "") === params.location)
  }
  if (params?.q) {
    const q = params.q.toLowerCase()
    ads = ads.filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
  }
  if (params?.sort === "budget-asc") {
    ads.sort((a, b) => (a.budget ?? Number.POSITIVE_INFINITY) - (b.budget ?? Number.POSITIVE_INFINITY))
  } else if (params?.sort === "budget-desc") {
    ads.sort((a, b) => (b.budget ?? -1) - (a.budget ?? -1))
  } else {
    ads.sort((a, b) => b.created_at - a.created_at)
  }
  return ads
}
export function getAd(id: string) {
  const db = loadDB()
  return db.ads.find((a) => a.id === id)
}
export function createAd(input: {
  title: string
  description: string
  category: string
  images: string[]
  location?: string
  budget?: number
  price_from?: number
  price_to?: number
}) {
  const db = loadDB()
  const user = getCurrentUser()
  if (!user || user.role !== "customer") throw new Error("Only customers can post ads")
  const ad: Ad = {
    id: uid("ad-"),
    title: input.title,
    description: input.description,
    category: input.category,
    images: input.images,
    owner_id: user.id,
    status: "open",
    created_at: Date.now(),
    location: input.location,
    budget: input.budget,
    price_from: input.price_from,
    price_to: input.price_to,
  }
  db.ads.push(ad)
  saveDB(db)
  return ad
}

export function deleteAd(id: string) {
  const db = loadDB()
  const idx = db.ads.findIndex((a) => a.id === id)
  if (idx === -1) return false

  // gather related thread ids to clean messages
  const threadIds = (db.threads ?? []).filter((t) => t.ad_id === id).map((t) => t.id)

  // remove ad
  db.ads.splice(idx, 1)

  // remove related responses
  db.responses = db.responses.filter((r) => r.ad_id !== id)

  // remove related threads and messages
  db.threads = db.threads.filter((t) => t.ad_id !== id)
  db.messages = db.messages.filter((m) => !threadIds.includes(m.thread_id))

  saveDB(db)
  return true
}

// Responses and messaging
export function respondToAd(ad_id: string, message: string) {
  const db = loadDB()
  const user = getCurrentUser()
  const ad = getAd(ad_id)
  if (!user || user.role !== "vendor") throw new Error("Only vendors can respond")
  if (!ad) throw new Error("Ad not found")

  // ensure a thread between this vendor and customer for this ad
  let thread = db.threads.find((t) => t.ad_id === ad_id && t.vendor_id === user.id && t.customer_id === ad.owner_id)
  if (!thread) {
    thread = {
      id: uid("thr-"),
      ad_id,
      vendor_id: user.id,
      customer_id: ad.owner_id,
      created_at: Date.now(),
      last_message_at: Date.now(),
    }
    db.threads.push(thread)
  }
  const resp: AdResponse = {
    id: uid("rsp-"),
    ad_id,
    vendor_id: user.id,
    message,
    status: "new",
    created_at: Date.now(),
    thread_id: thread.id,
  }
  db.responses.push(resp)
  const msg: Message = {
    id: uid("msg-"),
    thread_id: thread.id,
    sender_id: user.id,
    text: message,
    timestamp: Date.now(),
  }
  db.messages.push(msg)
  const t = db.threads.find((t) => t.id === thread!.id)
  if (t) t.last_message_at = msg.timestamp
  saveDB(db)
  return { response: resp, thread }
}

export function getThread(thread_id: string) {
  const db = loadDB()
  return db.threads.find((t) => t.id === thread_id)
}
export function listThreadsForUser(user_id: string) {
  const db = loadDB()
  return db.threads
    .filter((t) => t.customer_id === user_id || t.vendor_id === user_id)
    .sort((a, b) => (b.last_message_at ?? b.created_at) - (a.last_message_at ?? a.created_at))
}
export function listMessages(thread_id: string) {
  const db = loadDB()
  return db.messages.filter((m) => m.thread_id === thread_id).sort((a, b) => a.timestamp - b.timestamp)
}
export function sendMessage(thread_id: string, text: string) {
  const db = loadDB()
  const user = getCurrentUser()
  if (!user) throw new Error("Not signed in")
  const msg: Message = {
    id: uid("msg-"),
    thread_id,
    sender_id: user.id,
    text,
    timestamp: Date.now(),
  }
  db.messages.push(msg)
  const t = db.threads.find((t) => t.id === thread_id)
  if (t) t.last_message_at = msg.timestamp
  saveDB(db)
  return msg
}

// Flags
export function flagItem(target_type: TargetType, target_id: string, reason: string) {
  const db = loadDB()
  const flag: Flag = {
    id: uid("flg-"),
    target_type,
    target_id,
    reason,
    created_at: Date.now(),
  }
  db.flags.push(flag)
  saveDB(db)
  return flag
}

// Categories & users
export function getCategories() {
  return loadDB().categories
}
export function getUser(user_id: string) {
  return loadDB().users.find((u) => u.id === user_id)
}

// Vendor shop listing helpers (optional usage)
export function listShopListings() {
  return loadDB().vendor_shops ?? []
}
export function getShopListingForVendor(vendor_id: string) {
  return (loadDB().vendor_shops ?? []).find((s) => s.vendor_id === vendor_id)
}
export function upsertVendorShopListing(input: {
  id?: string
  vendor_id: string
  title: string
  description: string
  category: string
  location?: string
  images?: string[]
  tags?: string[]
  status?: "active" | "hidden"
}) {
  const db = loadDB()
  if (!Array.isArray(db.vendor_shops)) db.vendor_shops = []
  const now = Date.now()
  if (input.id) {
    const idx = db.vendor_shops.findIndex((s) => s.id === input.id)
    if (idx >= 0) {
      db.vendor_shops[idx] = { ...db.vendor_shops[idx], ...input }
    }
  } else {
    db.vendor_shops.push({
      id: uid("shop-"),
      vendor_id: input.vendor_id,
      title: input.title,
      description: input.description,
      category: input.category,
      location: input.location,
      images: input.images ?? [],
      tags: input.tags ?? [],
      created_at: now,
      status: input.status ?? "active",
    })
  }
  saveDB(db)
  return getShopListingForVendor(input.vendor_id)
}

// Classifieds helpers
export function createClassified(input: {
  title: string
  description: string
  category: string
  images: string[]
  price?: number
}) {
  const db = loadDB()
  const user = getCurrentUser()
  if (!user || user.role !== "vendor") throw new Error("Only vendors can post classifieds")
  const item: Classified = {
    id: uid("cls-"),
    vendor_id: user.id,
    title: input.title,
    description: input.description,
    images: input.images,
    category: input.category,
    price: input.price,
    created_at: Date.now(),
    status: "active",
  }
  if (!Array.isArray(db.classifieds)) db.classifieds = []
  db.classifieds.push(item)
  saveDB(db)
  return item
}

export function listClassifieds(params?: {
  q?: string
  category?: string
  sort?: "newest" | "price-asc" | "price-desc"
}) {
  const db = loadDB()
  let items = [...(db.classifieds ?? [])]
  if (params?.category && params.category !== "all") {
    items = items.filter((i) => i.category === params.category)
  }
  if (params?.q) {
    const q = params.q.toLowerCase()
    items = items.filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
  }
  if (params?.sort === "price-asc") {
    items.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY))
  } else if (params?.sort === "price-desc") {
    items.sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
  } else {
    items.sort((a, b) => b.created_at - a.created_at)
  }
  return items
}

// ===== QUOTE SYSTEM =====

/**
 * Create a new quote for an ad (vendor only)
 */
export function createQuote(input: {
  ad_id: string
  price_inr: number
  delivery_days: number
  message: string
}) {
  const db = loadDB()
  const user = getCurrentUser()
  const ad = getAd(input.ad_id)
  
  if (!user || user.role !== "vendor") throw new Error("Only vendors can submit quotes")
  if (!ad) throw new Error("Ad not found")
  if (ad.status === "closed") throw new Error("This ad is no longer accepting quotes")

  // Create or get thread between vendor and customer
  let thread = db.threads.find((t) => t.ad_id === input.ad_id && t.vendor_id === user.id && t.customer_id === ad.owner_id)
  if (!thread) {
    thread = {
      id: uid("thr-"),
      ad_id: input.ad_id,
      vendor_id: user.id,
      customer_id: ad.owner_id,
      created_at: Date.now(),
      last_message_at: Date.now(),
    }
    db.threads.push(thread)
  }

  const quote: Quote = {
    id: uid("quo-"),
    ad_id: input.ad_id,
    vendor_id: user.id,
    price_inr: input.price_inr,
    delivery_days: input.delivery_days,
    message: input.message,
    status: "pending",
    created_at: Date.now(),
    updated_at: Date.now(),
    thread_id: thread.id,
  }

  db.quotes.push(quote)
  
  // Auto-create a message in the thread with quote details
  const msg: Message = {
    id: uid("msg-"),
    thread_id: thread.id,
    sender_id: user.id,
    text: `📋 **Quote Submitted**\n💰 Price: ₹${input.price_inr.toLocaleString('en-IN')}\n⏱️ Delivery: ${input.delivery_days} days\n\n${input.message}`,
    timestamp: Date.now(),
  }
  db.messages.push(msg)
  thread.last_message_at = msg.timestamp
  
  saveDB(db)
  return quote
}

/**
 * Get all quotes for a specific ad
 */
export function listQuotesForAd(ad_id: string) {
  const db = loadDB()
  return db.quotes.filter((q) => q.ad_id === ad_id).sort((a, b) => b.created_at - a.created_at)
}

/**
 * Get all quotes submitted by a vendor
 */
export function listQuotesByVendor(vendor_id: string) {
  const db = loadDB()
  return db.quotes.filter((q) => q.vendor_id === vendor_id).sort((a, b) => b.created_at - a.created_at)
}

/**
 * Get a single quote by ID
 */
export function getQuote(quote_id: string) {
  const db = loadDB()
  return db.quotes.find((q) => q.id === quote_id)
}

/**
 * Update quote status (customer accepts/rejects, vendor withdraws)
 */
export function updateQuoteStatus(quote_id: string, new_status: QuoteStatus) {
  const db = loadDB()
  const user = getCurrentUser()
  const quote = db.quotes.find((q) => q.id === quote_id)
  
  if (!quote) throw new Error("Quote not found")
  
  const ad = getAd(quote.ad_id)
  if (!ad) throw new Error("Ad not found")
  
  // Validate permissions
  if (new_status === "accepted" || new_status === "rejected") {
    if (!user || user.id !== ad.owner_id) throw new Error("Only the ad owner can accept/reject quotes")
  } else if (new_status === "withdrawn") {
    if (!user || user.id !== quote.vendor_id) throw new Error("Only the vendor can withdraw their quote")
  }
  
  // If accepting, reject all other pending quotes for this ad
  if (new_status === "accepted") {
    db.quotes.forEach((q) => {
      if (q.ad_id === quote.ad_id && q.id !== quote_id && q.status === "pending") {
        q.status = "rejected"
        q.updated_at = Date.now()
      }
    })
    // Close the ad
    ad.status = "closed"
  }
  
  quote.status = new_status
  quote.updated_at = Date.now()
  
  // Send notification message to thread
  if (quote.thread_id) {
    const statusText = new_status === "accepted" ? "✅ Accepted" : new_status === "rejected" ? "❌ Rejected" : "🚫 Withdrawn"
    const msg: Message = {
      id: uid("msg-"),
      thread_id: quote.thread_id,
      sender_id: user!.id,
      text: `📋 **Quote ${statusText}**\n\nThe quote for ₹${quote.price_inr.toLocaleString('en-IN')} has been ${new_status}.`,
      timestamp: Date.now(),
    }
    db.messages.push(msg)
    
    const thread = db.threads.find((t) => t.id === quote.thread_id)
    if (thread) thread.last_message_at = msg.timestamp
  }
  
  saveDB(db)
  return quote
}

// ===== REVIEW SYSTEM =====

/**
 * Create a review for a vendor (customer only, must have accepted quote)
 */
export function createReview(vendor_id: string, rating: number, comment: string) {
  const db = loadDB()
  const user = getCurrentUser()
  
  if (!user || user.role !== "customer") throw new Error("Only customers can leave reviews")
  if (rating < 1 || rating > 5) throw new Error("Rating must be between 1 and 5")
  
  // Check if customer has an accepted quote with this vendor
  const hasAcceptedQuote = db.quotes.some(
    (q) => q.vendor_id === vendor_id && q.status === "accepted" && 
    db.ads.some((ad) => ad.id === q.ad_id && ad.owner_id === user.id)
  )
  
  if (!hasAcceptedQuote) {
    throw new Error("You can only review vendors you've worked with")
  }
  
  // Check if already reviewed
  const existingReview = db.reviews.find(
    (r) => r.vendor_id === vendor_id && r.customer_id === user.id
  )
  if (existingReview) {
    throw new Error("You've already reviewed this vendor")
  }
  
  const review: Review = {
    id: uid("rev-"),
    vendor_id,
    customer_id: user.id,
    rating,
    comment: comment.trim(),
    created_at: Date.now(),
  }
  
  db.reviews.push(review)
  
  // Update vendor's rating
  updateVendorRating(vendor_id)
  
  saveDB(db)
  return review
}

/**
 * Get all reviews for a vendor
 */
export function listReviewsForVendor(vendor_id: string) {
  const db = loadDB()
  return db.reviews.filter((r) => r.vendor_id === vendor_id).sort((a, b) => b.created_at - a.created_at)
}

/**
 * Calculate and update vendor's average rating
 */
function updateVendorRating(vendor_id: string) {
  const db = loadDB()
  const vendor = db.users.find((u) => u.id === vendor_id && u.role === "vendor")
  if (!vendor) return
  
  const reviews = db.reviews.filter((r) => r.vendor_id === vendor_id)
  if (reviews.length === 0) {
    vendor.rating = undefined
    vendor.total_reviews = 0
    return
  }
  
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  vendor.rating = Math.round(avgRating * 10) / 10 // Round to 1 decimal
  vendor.total_reviews = reviews.length
}

/**
 * Get list of all vendors with optional filtering
 */
export function listVendors(params?: {
  specialty?: string
  minRating?: number
  location?: string
}) {
  const db = loadDB()
  let vendors = db.users.filter((u) => u.role === "vendor")
  
  if (params?.specialty) {
    vendors = vendors.filter((v) => v.specialties?.includes(params.specialty))
  }
  
  if (params?.minRating) {
    vendors = vendors.filter((v) => (v.rating ?? 0) >= params.minRating)
  }
  
  if (params?.location && params.location !== "all") {
    vendors = vendors.filter((v) => v.location === params.location)
  }
  
  // Sort by rating (highest first), then by total reviews
  return vendors.sort((a, b) => {
    const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0)
    if (ratingDiff !== 0) return ratingDiff
    return (b.total_reviews ?? 0) - (a.total_reviews ?? 0)
  })
}

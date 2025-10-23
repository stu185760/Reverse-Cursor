/**
 * AI Matching System for EasyCustomized
 * Simple keyword-based matching for MVP
 */

import { loadDB, listVendors, type User, type Ad } from "./local-db"

interface VendorMatch {
  vendor: User
  score: number
  matchReasons: string[]
}

/**
 * Extract keywords from text (remove common words)
 */
function extractKeywords(text: string): string[] {
  const commonWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "as", "is", "was", "are", "were", "be",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "can", "need", "want", "looking", "find",
    "get", "make", "take", "see", "go", "come", "give", "use", "work",
  ])

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !commonWords.has(word))
}

/**
 * Calculate match score between vendor and ad
 */
function calculateMatchScore(vendor: User, ad: Ad): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []

  // Extract keywords from ad
  const adKeywords = new Set([
    ...extractKeywords(ad.title),
    ...extractKeywords(ad.description),
  ])

  // 1. Category match (CRITICAL - must match!)
  // If vendor doesn't specialize in this category, score is 0
  const hasCategoryMatch = vendor.specialties?.includes(ad.category)
  if (!hasCategoryMatch) {
    // No category match = not a good fit, return 0
    return { score: 0, reasons: ["Does not specialize in " + ad.category] }
  }
  
  // Category matches - add big score boost
  score += 100 // Much higher weight for category match
  reasons.push(`✓ Specializes in ${ad.category}`)

  // 2. Location match
  if (vendor.location === ad.location || ad.location === "All India" || ad.location === "Remote") {
    score += 20
    if (vendor.location === ad.location) {
      reasons.push(`✓ Located in ${ad.location}`)
    } else if (ad.location === "All India") {
      reasons.push(`✓ Serves All India`)
    }
  }

  // 3. Keyword overlap in specialties
  if (vendor.specialties) {
    const specialtyKeywords = vendor.specialties.flatMap((s) => extractKeywords(s))
    const matches = specialtyKeywords.filter((kw) => adKeywords.has(kw))
    if (matches.length > 0) {
      score += matches.length * 5
      reasons.push(`Keywords: ${matches.slice(0, 3).join(", ")}`)
    }
  }

  // 4. Business description match
  if (vendor.bio) {
    const bioKeywords = new Set(extractKeywords(vendor.bio))
    const matches = [...adKeywords].filter((kw) => bioKeywords.has(kw))
    if (matches.length > 0) {
      score += matches.length * 2
    }
  }

  // 5. Rating bonus (vendors with good ratings)
  if (vendor.rating && vendor.rating >= 4.5) {
    score += 10
    reasons.push(`⭐ Top-rated (${vendor.rating})`)
  } else if (vendor.rating && vendor.rating >= 4.0) {
    score += 5
    reasons.push(`⭐ Rated ${vendor.rating}`)
  }

  // 6. Experience bonus
  if (vendor.years_experience && vendor.years_experience >= 5) {
    score += 5
    reasons.push(`📅 ${vendor.years_experience}+ years experience`)
  }

  // 7. Verified bonus
  if (vendor.verified) {
    score += 5
    reasons.push("✓ Verified vendor")
  }

  return { score, reasons }
}

/**
 * Find matching vendors for an ad
 */
export function matchVendorsToAd(adId: string, limit: number = 5): VendorMatch[] {
  const db = loadDB()
  const ad = db.ads.find((a) => a.id === adId)
  
  if (!ad) return []

  const vendors = listVendors()
  const matches: VendorMatch[] = []

  for (const vendor of vendors) {
    const { score, reasons } = calculateMatchScore(vendor, ad)
    
    // Only include vendors with positive score
    if (score > 0) {
      matches.push({
        vendor,
        score,
        matchReasons: reasons,
      })
    }
  }

  // Sort by score (highest first) and return top N
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Suggest category for an ad based on keywords
 */
export function suggestCategory(title: string, description: string): {
  category: string
  confidence: number
} {
  const text = `${title} ${description}`.toLowerCase()
  
  const categoryKeywords: Record<string, string[]> = {
    clothing: ["clothing", "dress", "shirt", "pant", "jacket", "apparel", "fashion", "wear", "garment", "textile"],
    footwear: ["shoe", "boot", "sandal", "footwear", "sneaker", "heel", "slipper"],
    furniture: ["furniture", "chair", "table", "sofa", "bed", "desk", "cabinet", "shelf"],
    automobile: ["car", "bike", "vehicle", "automobile", "scooter", "motorcycle", "auto"],
    jewelry: ["jewelry", "ring", "necklace", "bracelet", "earring", "gold", "silver", "diamond"],
    gifting: ["gift", "present", "hamper", "corporate", "wedding", "birthday", "anniversary"],
    others: [],
  }

  let bestMatch = { category: "others", confidence: 0 }

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === "others") continue
    
    const matches = keywords.filter((kw) => text.includes(kw))
    const confidence = (matches.length / keywords.length) * 100

    if (confidence > bestMatch.confidence) {
      bestMatch = { category, confidence: Math.min(confidence, 95) } // Cap at 95%
    }
  }

  return bestMatch
}

/**
 * Get recommended ads for a vendor based on their profile
 */
export function getRecommendedAdsForVendor(vendorId: string, limit: number = 10): Ad[] {
  const db = loadDB()
  const vendor = db.users.find((u) => u.id === vendorId && u.role === "vendor")
  
  if (!vendor) return []

  const openAds = db.ads.filter((a) => a.status === "open")
  const scored: Array<{ ad: Ad; score: number }> = []

  for (const ad of openAds) {
    const { score } = calculateMatchScore(vendor, ad)
    if (score > 0) {
      scored.push({ ad, score })
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.ad)
}


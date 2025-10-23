import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number as Indian Rupees (INR)
 * @param amount - The amount to format
 * @returns Formatted string like ₹2,500 or ₹50,000
 */
export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return "—"
  
  // Indian number format with lakhs/crores
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format price range in INR
 */
export function formatPriceRange(from?: number, to?: number): string {
  if (!from && !to) return "Budget not specified"
  if (from && !to) return `From ${formatCurrency(from)}`
  if (!from && to) return `Up to ${formatCurrency(to)}`
  return `${formatCurrency(from)} - ${formatCurrency(to)}`
}

export function formatDateTime(ts: number) {
  const d = new Date(ts)
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const yyyy = d.getFullYear()
  let h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, "0")
  const ampm = h >= 12 ? "pm" : "am"
  h = h % 12
  if (h === 0) h = 12
  const hh = String(h).padStart(2, "0")
  return `${dd}/${mm}/${yyyy} ${hh}:${m} ${ampm}`
}

export function formatTime(ts: number) {
  const d = new Date(ts)
  let h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, "0")
  const ampm = h >= 12 ? "pm" : "am"
  h = h % 12
  if (h === 0) h = 12
  const hh = String(h).padStart(2, "0")
  return `${hh}:${m} ${ampm}`
}

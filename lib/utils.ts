import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

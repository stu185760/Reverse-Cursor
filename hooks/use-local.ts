"use client"

import useSWR, { mutate as swrMutate } from "swr"
import {
  type DB,
  loadDB,
  getCategories,
  getCurrentUser,
  listAds,
  listThreadsForUser,
  listMessages,
  listClassifieds,
} from "@/lib/local-db"

const fetcher = (key: string) => {
  switch (key) {
    case "db":
      return loadDB()
    case "categories":
      return getCategories()
    case "current-user":
      return getCurrentUser()
    default:
      if (key.startsWith("ads")) {
        const q = new URLSearchParams(key.slice(3))
        return listAds({
          q: q.get("q") || undefined,
          category: q.get("category") || undefined,
          sort: (q.get("sort") as any) || undefined,
        })
      }
      if (key.startsWith("classifieds")) {
        const q = new URLSearchParams(key.slice("classifieds".length))
        return listClassifieds({
          q: q.get("q") || undefined,
          category: q.get("category") || undefined,
          sort: (q.get("sort") as any) || undefined,
        })
      }
      if (key.startsWith("threads:")) {
        const userId = key.split(":")[1]
        return listThreadsForUser(userId)
      }
      if (key.startsWith("messages:")) {
        const threadId = key.split(":")[1]
        return listMessages(threadId)
      }
      return null
  }
}

export function useDB() {
  return useSWR<DB>("db", fetcher, { suspense: false })
}

export function mutateDB() {
  swrMutate("db")
}

export function useCategories() {
  return useSWR("categories", fetcher)
}

export function useCurrentUser() {
  return useSWR("current-user", fetcher)
}

export function refreshCurrentUser() {
  swrMutate("current-user")
}

export function useAds(params?: { q?: string; category?: string; sort?: "newest" | "budget-asc" | "budget-desc" }) {
  const qs = new URLSearchParams()
  if (params?.q) qs.set("q", params.q)
  if (params?.category) qs.set("category", params.category)
  if (params?.sort) qs.set("sort", params.sort)
  return useSWR(`ads?${qs.toString()}`, fetcher)
}

export function refreshAds(params?: { q?: string; category?: string; sort?: "newest" | "budget-asc" | "budget-desc" }) {
  const qs = new URLSearchParams()
  if (params?.q) qs.set("q", params.q)
  if (params?.category) qs.set("category", params.category)
  if (params?.sort) qs.set("sort", params.sort)
  swrMutate(`ads?${qs.toString()}`)
}

export function useClassifieds(params?: {
  q?: string
  category?: string
  sort?: "newest" | "price-asc" | "price-desc"
}) {
  const qs = new URLSearchParams()
  if (params?.q) qs.set("q", params.q)
  if (params?.category) qs.set("category", params.category)
  if (params?.sort) qs.set("sort", params.sort)
  return useSWR(`classifieds?${qs.toString()}`, fetcher)
}

export function refreshClassifieds(params?: {
  q?: string
  category?: string
  sort?: "newest" | "price-asc" | "price-desc"
}) {
  const qs = new URLSearchParams()
  if (params?.q) qs.set("q", params.q)
  if (params?.category) qs.set("category", params.category)
  if (params?.sort) qs.set("sort", params.sort)
  swrMutate(`classifieds?${qs.toString()}`)
}

export function useThreads(userId?: string) {
  return useSWR(userId ? `threads:${userId}` : null, fetcher)
}

export function refreshThreads(userId: string) {
  swrMutate(`threads:${userId}`)
}

export function useMessages(threadId?: string) {
  return useSWR(threadId ? `messages:${threadId}` : null, fetcher)
}

export function refreshMessages(threadId: string) {
  swrMutate(`messages:${threadId}`)
}

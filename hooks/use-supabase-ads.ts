import useSWR from "swr"
import { listAds, type Ad } from "@/lib/supabase-db"

export function useAds(filters?: { category?: string; location?: string; sort?: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    ["ads", filters],
    async () => {
      return await listAds(filters)
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  )

  return {
    ads: (data as Ad[]) || [],
    isLoading,
    error,
    mutate,
  }
}

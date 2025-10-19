"use client"

import { INDIA_CITIES, GLOBAL_CITIES } from "@/lib/locations"

type Props = {
  id?: string
  value: string
  onChange: (value: string) => void
  includeAll?: boolean // include "All locations" option (useful for filters)
  className?: string
  "aria-label"?: string
}

export default function LocationSelect({ id, value, onChange, includeAll, className, "aria-label": ariaLabel }: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className || "rounded-md border bg-background px-3 py-2"}
      aria-label={ariaLabel || "Location"}
    >
      {includeAll && <option value="all">All locations</option>}
      <optgroup label="India">
        {INDIA_CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </optgroup>
      <optgroup label="Global">
        {GLOBAL_CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </optgroup>
    </select>
  )
}

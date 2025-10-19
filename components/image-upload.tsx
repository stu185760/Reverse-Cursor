"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  value: string[]
  onChange: (images: string[]) => void
  multiple?: boolean
}

export default function ImageUpload({ value, onChange, multiple = true }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const readers = Array.from(files).map(
      (f) =>
        new Promise<string>((resolve, reject) => {
          const fr = new FileReader()
          fr.onload = () => resolve(String(fr.result || ""))
          fr.onerror = reject
          fr.readAsDataURL(f)
        }),
    )
    const urls = await Promise.all(readers)
    const merged = multiple ? [...value, ...urls] : [urls[0] ?? ""]
    onChange(merged)
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
        Upload {multiple ? "images" : "image"}
      </Button>
      {value?.length ? (
        <div className="grid grid-cols-3 gap-3">
          {value.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src || "/placeholder.svg?height=120&width=180&query=uploaded%20image%20preview"}
              alt={`Uploaded ${i + 1}`}
              className="w-full h-24 object-cover rounded-md border"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

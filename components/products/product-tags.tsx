"use client"

import { useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

const tags = [
  { id: "all", label: "All", color: "bg-black hover:bg-black/75" },
  { id: "perfume", label: "Perfumes", color: "bg-blue-500 hover:bg-blue-600" },
  { id: "skincare", label: "Skincare", color: "bg-green-500 hover:bg-green-600" },
  { id: "cosmetics", label: "Cosmetics", color: "bg-purple-500 hover:bg-purple-600" },
]

export default function ProductTags() {
  const router = useRouter()
  const params = useSearchParams()
  const currentTag = params.get("tag") || "all"

  const setFilter = useCallback((tag: string) => {
    router.push(tag === "all" ? "/" : `?tag=${tag}`)
  }, [router])

  const tagElements = useMemo(() => tags.map(tag => (
    <Badge
      key={tag.id}
      onClick={() => setFilter(tag.id)}
      className={cn(
        "cursor-pointer transition-all duration-300 hover:opacity-100",
        tag.color,
        currentTag === tag.id ? "opacity-100" : "opacity-50"
      )}
      aria-label={`Filter by ${tag.label}`}
    >
      {tag.label}
    </Badge>
  )), [currentTag, setFilter])

  return (
    <div className="my-4 flex gap-4 items-center justify-center overflow-x-auto pb-2">
      {tagElements}
    </div>
  )
}
"use client"

import { InstantSearchNext } from "react-instantsearch-nextjs"
import { SearchBox, Hits } from "react-instantsearch"
import { searchClient } from "@/lib/algolia-client"
import Link from "next/link"
import Image from "next/image"
import { Card } from "../ui/card"
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

function Hit({
  hit,
}: {
  hit: {
    objectID: string
    id: string
    price: number
    title: string
    productType: string
    variantImages: string

    _highlightResult: {
      title: {
        value: string
        matchLevel: string
        fullyHighlighted: boolean
        matchedWords: string[]
      }
      productType: {
        value: string
        matchLevel: string
        fullyHighlighted: boolean
        matchedWords: string[]
      }
    }
  }
}) {
    // if(hit._highlightResult.title.matchLevel === 'none' && hit._highlightResult.productType.matchLevel === 'none'){
    //     return null
    // }
    return (
      <Link
        href={`/products/${hit.objectID}?id=${hit.objectID}&productID=${hit.id}&price=${hit.price}&title=${hit.title}&type=${hit.productType}&image=${hit.variantImages[0]}&variantID=${hit.objectID}`}
        className="block p-4 hover:bg-secondary transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <Image
            src={hit.variantImages}
            alt={hit.title}
            width={60}
            height={60}
            className="rounded-md object-cover"
          />
          <div className="flex-grow">
            <p className="font-medium" dangerouslySetInnerHTML={{ __html: hit._highlightResult.title.value }}></p>
            <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: hit._highlightResult.productType.value }}></p>
          </div>
          <p className="font-semibold">₵{hit.price}</p>
        </div>
      </Link>
    )
  }
  

  export default function Algolia() {
    const [active, setActive] = useState(false)
    const MCard = useMemo(() => motion(Card), [])
  
    return (
      <InstantSearchNext
        future={{
          persistHierarchicalRootCount: true,
          preserveSharedStateOnUnmount: true,
        }}
        indexName="products"
        searchClient={searchClient}
      >
        <div className="relative max-w-2xl mx-auto">
          <SearchBox
            placeholder="Search for products"
            onFocus={() => setActive(true)}
            onBlur={() => {
              setTimeout(() => setActive(false), 200)
            }}
            classNames={{
              form: "relative mb-4",
              input: "w-full h-12 pl-12 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              submit: "absolute left-4 top-1/2 transform -translate-y-1/2",
              submitIcon: "hidden",
              reset: "absolute right-4 top-1/2 transform -translate-y-1/2",
              resetIcon: "text-gray-400 hover:text-gray-600",
            }}
            submitIconComponent={() => (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          />
          <AnimatePresence>
            {active && (
              <MCard
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full z-50 overflow-y-auto max-h-[70vh] shadow-lg rounded-lg border border-gray-200"
              >
                <Hits hitComponent={Hit} className="divide-y divide-gray-200" />
              </MCard>
            )}
          </AnimatePresence>
        </div>
      </InstantSearchNext>
    )
  }
'use client'

import { VariantsWithProduct } from "@/lib/infer-type"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import formatPrice from "@/lib/format-price"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

type ProductTypes = {
    variants: VariantsWithProduct[]
}

export default function Products({variants} : ProductTypes) {
    const params = useSearchParams()
    const paramTag = params.get("tag")

    const filtered = useMemo(() => {
        if(paramTag && variants){
            return variants.filter((variant) => variant.variantTags.some((tag) => tag.tag === paramTag))
        }
        return variants
    }, [paramTag, variants])

    return(
        <main className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {filtered.map((variant) => (
            <Link
                className="py-2 group block transition-all duration-300 ease-in-out hover:shadow-md rounded-lg"
                key={variant.id} 
                href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}>
                <div className="relative overflow-hidden rounded-md">
                    <Image 
                        className="rounded-md transition-transform duration-300 group-hover:scale-105" 
                        src={variant.variantImages[0].url} 
                        width={720} height={480} 
                        alt={variant.product.title} 
                        loading="lazy" 
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <div className="font-medium">
                        <h2 className="transition-colors duration-300 group-hover:text-primary">{variant.product.title}</h2>
                        <p className="text-sm text-muted-foreground">{variant.productType}</p>
                    </div>
                    <div>
                        <Badge className="text-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground" variant={'secondary'}>
                            {formatPrice(variant.product.price)}
                        </Badge>
                    </div>
                </div>
            </Link>
        ))}
        </main>
    )
}
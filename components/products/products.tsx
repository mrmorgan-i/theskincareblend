'use client'

import { VariantsWithProduct } from "@/lib/infer-type"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "../ui/badge"
import formatPrice from "@/lib/format-price"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useCartStore } from "@/lib/client-store" 
import { Button } from "../ui/button"
import { toast } from "sonner"

type ProductTypes = {
    variants: VariantsWithProduct[]
}

export default function Products({ variants }: ProductTypes) {
    const params = useSearchParams()
    const paramTag = params.get("tag")
    const { addToCart } = useCartStore()

    const filtered = useMemo(() => {
        if (paramTag && variants) {
            return variants.filter((variant) => variant.variantTags.some((tag) => tag.tag === paramTag))
        }
        return variants
    }, [paramTag, variants])

    const handleAddToCartSuccess = () => {
        toast.success('Added to cart');
    };

    return (
        <main className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {filtered.map((variant) => (
                <div key={variant.id} className="py-2 group block transition-all duration-300 ease-in-out hover:shadow-md rounded-lg">
                    <Link
                        href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
                        className="block"
                    >
                        <div className="relative overflow-hidden rounded-md">
                            <Image
                                className="rounded-md transition-transform duration-300 group-hover:scale-105"
                                src={variant.variantImages[0].url}
                                width={720}
                                height={480}
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
                    <Button
                        className="mt-2 w-full bg-primary text-primary-foreground py-2 px-4 rounded-md transition-colors duration-300 hover:bg-primary/90"
                        onClick={() => {
                            addToCart({
                                name: variant.product.title,
                                image: variant.variantImages[0].url,
                                id: variant.id,
                                variant: {
                                    variantID: variant.id,
                                    quantity: 1
                                },
                                price: variant.product.price
                            });
                            handleAddToCartSuccess(); // Call the success handler here
                        }}
                    >
                        Add to Cart
                    </Button>
                </div>
            ))}
        </main>
    )
}

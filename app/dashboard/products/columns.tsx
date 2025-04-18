"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

import Image from "next/image"
import { useAction } from "next-safe-action/hooks"
import { deleteProduct } from "@/server/actions/delete-product"
import { toast } from "sonner"
import Link from "next/link"
import { VariantsWithImagesTags } from "@/lib/infer-type"
import {ProductVariant} from "./product-variant"

type ProductColumn = {
    title: string,
    price: number,
    image: string,
    variants: VariantsWithImagesTags[],
    id: number,
}

const ActionCell = ({row}: {row: Row<ProductColumn>}) => {
    const {execute, status} = useAction(deleteProduct, {
        onSuccess: (data) => {
            toast.dismiss()
            if(data?.error) {
                toast.error(data.error)
            }
            if(data?.success){
                toast.success(data.success)
            }
        },
        onExecute: () => {
            toast.loading('Deleting product...')
        }
    })

    const product = row.original;
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem 
                    className="dark:focus:bg-primary focus:bg-primary/40 cursor-pointer">
                    <Link href={`/dashboard/add-product?id=${product.id}`}>
                        Edit Product
                    </Link>

                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => execute({id: product.id})} 
                    className="dark:focus:bg-destructive focus:bg-destructive/70 cursor-pointer">
                    Delete Product
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'variants',
        header: 'Variants',
        cell: ({row}) => {
            const variants = row.getValue('variants') as VariantsWithImagesTags[]
            return (
                <div className="flex gap-1">
                    {variants.map((variant) => (
                        <div key={variant.id}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ProductVariant 
                                            productID={variant.productID} 
                                            variant={variant} 
                                            editMode={true}>
                                            <div 
                                                className="w-5 h-5 rounded-full " 
                                                key={variant.id} 
                                                style={{background: variant.color}}
                                            />
                                        
                                        </ProductVariant>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <p>{variant.productType}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </div>
                    ))}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <span>
                                <ProductVariant productID={row.original.id} editMode={false}>
                                    <PlusCircle className="h-5 w-5 text-primary" />
                                </ProductVariant>
                            </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add a new variant</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )
        },
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({row}) => {
            const price = parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat('en-US', {
                currency: 'GHC',
                style: 'currency',
            }).format(price)
            return (<div className="font-medium text-xs">
                {formatted}
            </div>)
        },
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({row}) => {
            const cellImage = row.getValue('image') as string
            const cellTitle = row.getValue('title') as string
            return(
                <div className="">
                    <Image 
                        src={cellImage} 
                        alt={cellTitle} 
                        width={50} 
                        height={50}
                        className="rounded-md" />
                </div>
            )
        }
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ActionCell,
    },
]

'use client'

import { ProductSchema, zProductSchema } from "@/types/product-schema"
import { useForm } from "react-hook-form"
import { FaCediSign } from "react-icons/fa6";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DollarSign, DollarSignIcon } from "lucide-react"
import Tiptap from "./tiptap"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { createProduct } from "@/server/actions/create-product"
import { useRouter, useSearchParams } from "next/navigation"
import {toast} from "sonner"
import { getProduct } from "@/server/actions/get-product"
import { useEffect } from "react"
  

export default function ProductForm(){
    const form = useForm<zProductSchema>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
        },
        mode: 'onChange',
    })

    const router = useRouter()
    const searchParams = useSearchParams()
    const editMode = searchParams.get('id')

    const checkProduct = async (id: number) => {
        if(editMode){
            const data = await getProduct(id)
            if(data?.error){
                toast.error(data.error)
                router.push('/dashboard/products')
                return
            }
            if(data?.success){
                const id = parseInt(editMode)
                form.setValue('title', data.success.title)
                form.setValue('description', data.success.description)
                form.setValue('price', data.success.price)
                form.setValue('id', id)
            }
        }
    }

    useEffect(() => {
        if(editMode){
            checkProduct(parseInt(editMode))
        }
    }, [])

    const {execute, status} = useAction(createProduct, {
        onSuccess: (data) => {
            toast.dismiss()
            if(data?.error) {
                toast.error(data.error)
            }
            if(data?.success){
                router.push('/dashboard/products') 
                toast.success(data.success)
            }
        },
        onExecute: (data) => {
            if(editMode){
                toast.loading('Updating product...')
            }
            if(!editMode){
                toast.loading('Creating product...')
            }
        },
        
    })

    async function onSubmit(values: zProductSchema){
        execute(values)
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>{editMode ? 'Edit Product' : 'Create Product'}</CardTitle>
                <CardDescription>{editMode ? 'Make changes to existing product' : 'Add a brand new product'}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Product Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Title" {...field} />
                            </FormControl>
                            <FormDescription className="text-xs">
                                Enter the product title
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                               <Tiptap val={field.value}/>
                            </FormControl>
                            <FormDescription className="text-xs">
                                Add a product description
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="">
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-1">
                                    <FaCediSign size={36} className="p-2 bg-muted rounded-md" />
                                    <Input {...field} type="number" placeholder="Your price in GHS" step="0.1" min={0}/>
                                </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                                Enter the product price
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button disabled={
                                    status === 'executing' || 
                                    !form.formState.isValid || 
                                    !form.formState.isDirty 
                                } 
                                className="w-full" 
                                type="submit">
                                    {editMode ? 'Save changes' : 'Create Product'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            
        </Card>

    )
}
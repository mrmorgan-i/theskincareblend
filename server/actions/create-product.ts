'use server'

import { ProductSchema } from "@/types/product-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from ".."
import { eq } from "drizzle-orm"
import { products } from "../schema"
import { revalidatePath } from "next/cache"

const action = createSafeActionClient()


export const createProduct = action(ProductSchema, async ({description, price, title, id}) => {
    try {
        if(id){
            const currentProduct = await db.query.products.findFirst({
                where: eq(products.id, id)
            })
            if(!currentProduct) return {error: 'Product not found'}
            const editedProduct = await db
                                    .update(products)
                                    .set({description, price, title})
                                    .where(eq(products.id, id))
                                    .returning()
            revalidatePath('/dashboard/products')
            return {success: `Product ${editedProduct[0].title} has been updated successfully`}
        }
        if(!id){
            const newProduct = await db.insert(products).values({description, price, title}).returning()
            revalidatePath('/dashboard/products')
            return {success: `Product ${newProduct[0].title} has been added successfully`}
        }

    } catch (err) {
        return {error: JSON.stringify(err)}
    }
})
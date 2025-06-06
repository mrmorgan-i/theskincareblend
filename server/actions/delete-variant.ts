'use server'
import { createSafeActionClient } from 'next-safe-action'
import * as z from 'zod'
import { db } from '..'
import { productVariants } from '../schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import algoliasearch from "algoliasearch"

const action = createSafeActionClient()

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN!
)

const algoliaIndex = client.initIndex("products")

export const deleteVariant = action(z.object({id: z.number()}), async ({id}) => {
  try {
    const deletedVariant = await db.delete(productVariants).where((eq(productVariants.id, id))).returning()
    revalidatePath('/dashboard/products')
    algoliaIndex.deleteObject(deletedVariant[0].id.toString())
    return {success: `Variant ${deletedVariant[0].productType} deleted successfully`}
  } catch (error) {
    return {error: 'An error occurred while deleting the variant'}
  }  
})
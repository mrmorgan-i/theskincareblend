import * as z from "zod"

export const createOrderSchema = z.object({
  products: z.array(
    z.object({
      productID: z.number(),
      quantity: z.number(),
      variantID: z.number(),
    })
  ),
  status: z.string(),
  total: z.number(),
})

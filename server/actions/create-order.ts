"use server"

import { createOrderSchema } from "@/types/order-schema"
import { createSafeActionClient } from "next-safe-action"
import { auth } from "../auth"
import { db } from "@/server"
import { orderProduct, orders } from "../schema"
import * as z from "zod"

const action = createSafeActionClient()

// Define a type based on the Zod schema
type CreateOrderInput = z.infer<typeof createOrderSchema>

export const createOrder = action(
  createOrderSchema,
  async ({ products, status, total }: CreateOrderInput) => {
    const user = await auth()
    if (!user) return { error: "User not found" }

    const order = await db
      .insert(orders)
      .values({
        status,
        total,
        userID: user.user.id,
      })
      .returning()

    const orderProducts = products.map(
      async ({ productID, quantity, variantID }) => {
        await db.insert(orderProduct).values({
          quantity,
          orderID: order[0].id,
          productID: productID,
          productVariantID: variantID,
        })
      }
    )

    await Promise.all(orderProducts) // Ensure all products are inserted

    return { success: "Order has been added" }
  }
)

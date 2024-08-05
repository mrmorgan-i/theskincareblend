import * as z from "zod"

export const ProductSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long"
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long"
    }),
    price: z.coerce
        .number({invalid_type_error: "Price must be a number"})
        .positive({message: "Price must be a positive number"}),
})

export type zProductSchema = z.infer<typeof ProductSchema>
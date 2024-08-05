'use client'

import { useCartStore } from "@/lib/client-store"
import { motion } from "framer-motion"
import PaystackComponent from "./paystack-component"
import { useTheme } from "next-themes"

export default function Payment() {
  const { cart } = useCartStore()
  const { theme } = useTheme()

  const publicKey = process.env.NEXT_PUBLIC_PUBLISH_KEY!

  return (
    <motion.div className="max-w-2xl mx-auto">
      <PaystackComponent publicKey={publicKey} cart={cart} />
    </motion.div>
  )
}
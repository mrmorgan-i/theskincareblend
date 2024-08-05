'use client'

import { useCartStore } from "@/lib/client-store";
import { ShoppingBag } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import CartItems from "./cart-items";
import CartMessage from "./cart-message";
import Payment from "./payment";
import OrderConfirmed from "./order-confirmed";
import CartProgress from "./cart-progress";

export default function CartDrawer() {
  const { cart, checkoutProgress, setCheckoutProgress, cartOpen, setCartOpen } = useCartStore();

  // Function to handle drawer closing
  const handleDrawerClose = () => {
    setCheckoutProgress("cart-page"); // Change checkout progress to "cart-page"
    setCartOpen(false); // Close the cart drawer
  };

  return (
    <Drawer open={cartOpen} onOpenChange={setCartOpen} onClose={handleDrawerClose}> {/* Add onClose handler here */}
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex items-center justify-center -top-1 -right-0.5 w-4 h-4 dark:bg-primary bg-primary text-white text-xs font-bold rounded-full"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingBag />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <CartMessage />
        </DrawerHeader>
        <CartProgress />
          <div className="p-4 pb-8">
            {checkoutProgress === 'cart-page' && <CartItems />}
            {checkoutProgress === "payment-page" && <Payment />}
            {checkoutProgress === "confirmation-page" && <OrderConfirmed />}
          </div>
      </DrawerContent>
    </Drawer>
  );
}

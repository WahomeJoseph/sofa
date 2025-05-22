"use client"

import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Trash2, Minus, Plus, ShoppingCart, ArrowRight, ChevronLeft, ShoppingCartIcon, CarTaxiFrontIcon } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { updateQuantity, removeFromCart, clearCart } from "@/lib/features/Cartslice"
import CartIcon from "./CartIcon"

export default function Cart() {
  const [openCart, setOpenCart] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const { pending } = useFormStatus()
  const dispatch = useDispatch()

  const items = useSelector((state) => state.cart.items)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.16 // 16% VAT
  const total = subtotal + tax

  useEffect(() => {
    if (openCart) {
      setTimeout(() => setAnimateItems(true), 100)
    } else {
      setAnimateItems(false)
    }
  }, [openCart])

  const handleUpdate = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ id, quantity: Number(quantity) }))
    toast.success("Cart updated", {
      description: "Item quantity has been updated",
      duration: 3000,
    })
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
    toast.success("Item removed", {
      description: "Item has been removed from your cart",
      duration: 3000,
    })
  }

  const handleClear = () => {
    dispatch(clearCart())
    toast.success("Cart cleared", {
      description: "Your shopping cart has been cleared",
      duration: 3000,
    })
  }

  return (
    <>
      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <SheetTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="fixed z-50 top-26 right-10">
            <Button
              className="text-gray-950 bg-transparent p-3 rounded-full p-3 shadow-lg flex items-center gap-2 border border-amber-600/30"
              aria-label="Open cart">
                <CartIcon />
              {/* {itemCount > 0 && (
                <Badge className="bg-gray-950 text-amber-500 border-none ml-1 px-1.5 py-0 text-xs">{itemCount}</Badge>
              )} */}
            </Button>
          </motion.div>
        </SheetTrigger>

        <SheetContent
          className="flex flex-col left-[50%] translate-x-[-50%] w-full max-w-[90vw] md:max-w-2xl lg:max-w-3xl rounded-lg top-[50%] translate-y-[-50%] shadow-xl h-[90vh] max-h-[800px] bg-gradient-to-b from-gray-950 to-gray-900 border border-amber-600/10 text-amber-100/90"
          closeButton={false}>
          <SheetHeader className="mb-2 pb-4 border-b border-amber-600/20 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0 text-amber-600/70 hover:text-amber-600 hover:bg-amber-600/10"
              onClick={() => setOpenCart(false)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <SheetTitle className="text-xl text-center font-semibold text-amber-600">Your Shopping Cart</SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full text-center text-amber-100/70 overflow-auto-y px-4">
              <div className="bg-amber-600/10 p-8 rounded-full mb-6">
                <ShoppingCart className="h-16 w-16 text-amber-600/80" />
              </div>
              <h3 className="text-xl font-medium text-amber-600 mb-2">Your cart is empty</h3>
              <p className="text-sm mb-6">Discover our beautiful furniture collection and add your favorites to cart</p>
              <Button
                asChild
                className="mt-4 bg-amber-600 text-gray-950 hover:bg-amber-700 font-medium px-6"
                onClick={() => setOpenCart(false)}>
                <Link href="/shop">
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-grow overflow-y-auto mt-2 space-y-4 pr-1 custom-scrollbar">
                <AnimatePresence>
                  {animateItems &&
                    items.map((item, index) => (
                      <motion.div
                        key={item.id ? `${item.id}-${item.quantity}` : `fallback-key-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex bg-gray-800/30 hover:bg-gray-800/50 p-4 rounded-lg items-center gap-4 border border-amber-600/10 transition-all duration-200"
                      >
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-800/50 border border-amber-600/20">
                          {item.images?.[0] ? (
                            <Image
                              src={item.images[0] || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover object-center"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-amber-600/40">
                              <ShoppingBag className="h-10 w-10" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col">
                          <h3 className="font-medium text-amber-100">{item.name}</h3>
                          <p className="text-sm text-amber-600 font-semibold mt-1">KES {item.price.toLocaleString()}</p>

                          {/* Quantity Control */}
                          <div className="flex items-center gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdate(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || pending}
                              className="h-8 w-8 border-amber-600/30 bg-gray-800/50 hover:bg-amber-600/20 text-amber-100"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <Input
                              type="text"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleUpdate(item.id, Number(e.target.value) || 1)}
                              className="w-14 h-8 text-center border-amber-600/30 bg-gray-800/50 focus:ring-amber-600/30 focus:border-amber-600/50 text-amber-100"
                              disabled={pending}
                            />

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdate(item.id, item.quantity + 1)}
                              disabled={pending}
                              className="h-8 w-8 border-amber-600/30 bg-gray-800/50 hover:bg-amber-600/20 text-amber-100"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(item.id)}
                            className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
                            disabled={pending}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              <div className="mt-auto pt-4">
                <Separator className="my-4 bg-amber-600/20" />

                {/* Order Summary */}
                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-amber-100/70">Subtotal</span>
                    <span className="text-amber-100">KES {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-amber-100/70">VAT (16%)</span>
                    <span className="text-amber-100">KES {tax.toLocaleString()}</span>
                  </div>

                  <Separator className="my-2 bg-amber-600/10" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-600">Total</span>
                    <span className="text-lg font-bold text-amber-600">KES {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex-1 border-amber-600/30 bg-transparent hover:bg-amber-600/10 text-amber-100"
                    disabled={pending}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>

                  <Button
                    asChild
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-gray-950 font-medium"
                    disabled={items.length === 0 || pending}
                  >
                    <Link href="/checkout">
                      {pending ? "Processing..." : "Checkout"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-3 text-amber-600 hover:bg-amber-600/10 hover:text-amber-500"
                  onClick={() => setOpenCart(false)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(251, 191, 36, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 191, 36, 0.3);
        }
      `}</style>
    </>
  )
}

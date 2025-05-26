"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="flex flex-col space-y-6" variants={container} initial="hidden" animate="show">
      {/* Product Title and Price */}
      <div>
        <motion.div variants={item} className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </motion.div>

        <motion.div variants={item} className="flex items-center mt-2">
          <span className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
            KES {product.price.toLocaleString()}
          </span>
          {product.inStock !== false ? (
            <Badge className="ml-3 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">
              In Stock
            </Badge>
          ) : (
            <Badge className="ml-3 bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700">
              Out of Stock
            </Badge>
          )}
        </motion.div>
      </div>

      {/* Description */}
      <motion.div variants={item} className="prose max-w-none">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{product.description}</p>
      </motion.div>

      {/* Features */}
      {product.features?.length > 0 && (
        <motion.div variants={item}>
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Features</h2>
          <ul className="space-y-1">
            {product.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start text-gray-700 dark:text-gray-300"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400 mt-2 mr-2"></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Colors */}
      {product.colors?.length > 0 && (
        <motion.div variants={item}>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Colors</h2>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-amber-600 ring-2 ring-amber-200 dark:border-amber-400 dark:ring-amber-800"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                aria-label={color}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Quantity Selector */}
      <motion.div variants={item} className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quantity</h2>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
          <motion.button
            whileHover={{ backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border-r border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </motion.button>
          <span className="px-4 py-1 font-medium text-gray-900 dark:text-white">{quantity}</span>
          <motion.button
            whileHover={{ backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 border-l border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Additional Info */}
      {(product.sku || product.category) && (
        <motion.div
          variants={item}
          className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          {product.sku && (
            <div>
              <span className="font-medium text-gray-900 dark:text-white">SKU:</span> {product.sku}
            </div>
          )}
          {product.category && (
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Category:</span> {product.category}
            </div>
          )}
        </motion.div>
      )}

      {/* Add to Cart Button */}
      <motion.div variants={item} className="pt-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full py-6 text-lg bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

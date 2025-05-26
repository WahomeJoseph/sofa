"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ProductGallery({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Use placeholder if no images are provided
  const imageUrls = images?.length > 0 ? images : ["/placeholder.svg?height=600&width=600"]

  return (
    <div className="space-y-4">
      {/* Main Image with Animation */}
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={imageUrls[selectedImage] || "/placeholder.svg"}
              alt={`${name} - Image ${selectedImage + 1}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails - Only show if there are multiple images */}
      {imageUrls.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {imageUrls.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative h-20 cursor-pointer rounded-md overflow-hidden border-2",
                selectedImage === index
                  ? "border-amber-600 ring-2 ring-amber-200"
                  : "border-transparent hover:border-gray-300",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

import React from 'react'
import { Suspense } from 'react'
import Shop from '@/components/products/Shop'

export const generateMetadata = async () => {
  return {
    title: 'SofaLux | Shop',
    description: 'Shop for the best sofas and furniture',
  }
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Shop/>
    </Suspense>
  )
}

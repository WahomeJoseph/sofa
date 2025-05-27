'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader, Search, ChevronDown } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { SofaCard } from './SofaCard'
import { Input } from '../ui/input'
import Image from 'next/image'
import Cart from '../cart/Cart'

export default function Shop() {
  const { data: session } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [sortOption, setSortOption] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    'All', 'L-Shaped', 'U-Shaped', 'Recliner',
    'Sofa Bed', 'Loveseat', 'Stationary', 'Corner',
    'Single-Seater', 'Chesterfield', 'Modular'
  ]

  useEffect(() => {
    if (!session) {
      async function fetchProducts() {
        try {
          setLoading(true)
          const res = await fetch('/api/products', {
            cache: 'no-store',
          })
          if (!res.ok) throw new Error('Failed to fetch shop products');
          const data = await res.json()
          setProducts(data.products || [])
        } catch (error) {
          toast.error('Failed to fetch shop products', { duration: 4000 })
          console.error('Error fetching products:', error)
          setErrors('Failed to fetch products!')
        } finally {
          setLoading(false)
        }
      }
      fetchProducts()
    }
  }, [session, router])

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setSelectedCategories([])
    } else {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      )
    }
  }

  const handlePriceChange = (e, index) => {
    const newValue = Number(e.target.value)
    const newPriceRange = [...priceRange]
    newPriceRange[index] = newValue
    setPriceRange(newPriceRange.sort((a, b) => a - b))
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSearchTerm('')
    setPriceRange([0, 100000])
    setSortOption('featured')
  }

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
      const searchMatch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const priceMatch =
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]

      return categoryMatch && searchMatch && priceMatch
    })
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortOption === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortOption === 'price-low') {
        return a.price - b.price
      } else if (sortOption === 'price-high') {
        return b.price - a.price
      }
      return 0
    })

  return (
    <>
      <main className='md:py-24'>
          <Toaster position="top-center" richColors />
        <div className='flex flex-col min-h-screen bg-transparent pt-0 px-4 md:px-24'>
          <h1 className='text-3xl mb-3 font-bold text-[#ddd6cb] text-center'>Welcome To Our Shop</h1>
          {errors && (
            <p className='text-center text-red-600 mb-4' role='alert'>
              {errors}
            </p>
          )}
          {/* Search and Sort Row */}
          <div className="w-full flex md:flex-row gap-4 md:gap-6 mb-6">
            <div className="w-full md:w-3/4 relative">
              <div className="absolute top-1/2 left-3 flex items-center transform -translate-y-1/2 pointer-events-none">
                <Search className="h-5 w-5 text-amber-600" />
              </div>
              <Input
                type="text"
                placeholder="Search products by name, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-3 border border-gray-300 focus:ring-2 focus:ring-amber-500 rounded-full bg-[#ddd6cb] text-gray-800 placeholder:text-gray-700 focus:border-amber-500 transition-all"
                aria-label="Search products by name and description"
              />
            </div>

            <div className="relative max-w-md">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                aria-label="Sort products"
                className="block w-full md:w-56 pl-4 pr-10 py-2 text-sm md:text-base text-gray-800 bg-[#ddd6cb] border border-gray-300 rounded-full shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all cursor-pointer">
                <option value="" disabled hidden>Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="oldest">Oldest First</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={24} />
              </div>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center w-full py-3 mb-4 bg-amber-600 text-gray-900 rounded-lg font-medium">
            {showFilters ? 'Hide Category Filters' : 'Show Category Filters'}
            <ChevronDown size={24} />
          </button>

          <div className="flex flex-col md:flex-row gap-6 mb-8 h-[calc(100vh-220px)]">
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full mt-8 md:w-72 lg:w-80 h-fit sticky top-4 space-y-6 bg-[#ddd6cb] p-6 rounded-lg shadow-md border border-gray-200`}>
              <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                <div className="space-y-3">
                  <h3 className="text-center py-2 bg-black text-[#f8f5f0] rounded-full font-medium">
                    Filter By Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category}`}
                          checked={
                            category === 'All'
                              ? selectedCategories.length === 0
                              : selectedCategories.includes(category)
                          }
                          onChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-amber-600 transition-colors">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-center py-2 bg-black text-[#f8f5f0] rounded-full font-medium">
                    Filter By Price (KES)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Min: {priceRange[0].toLocaleString()}</span>
                      <span className="text-sm">Max: {priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full accent-amber-600"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full accent-amber-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 px-4 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition-colors font-medium mt-4">
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center w-full h-64">
                  <Loader className="animate-spin h-8 w-8 text-amber-600" />
                  <span className="ml-2 text-gray-400">Loading products...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="w-full text-center py-12">
                  <Image
                    src="/no-data.svg"
                    alt='No products available'
                    width={200}
                    height={200}
                    className='mx-auto my-4 opacity-80'
                  />
                  <p className="text-xl font-light capitalize text-amber-500">No products available in our store yet</p>
                  <p className="text-base text-amber-500 capitalize mt-2">Please check back later</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="w-full text-center py-12">
                  <Image
                    src="/no-data.svg"
                    alt='No matching products'
                    width={200}
                    height={200}
                    className='mx-auto my-4 opacity-80'
                  />
                  <p className="text-xl font-light text-gray-400">No products match your filters</p>
                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 bg-amber-600/10 hover:bg-amber-600/20 transition-colors cursor-pointer px-4 py-2 rounded-md text-amber-600">
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                  {filteredProducts.map((product) => (
                    <SofaCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
            <Cart />
          </div>
        </div>
      </main>
    </>
  )
}
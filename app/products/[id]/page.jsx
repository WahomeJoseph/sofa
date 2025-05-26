"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiShoppingCart, FiChevronRight, FiStar } from "react-icons/fi";
import { useState, useEffect } from "react";
import { use } from "react";


// Animation variants
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function ProductPage({ params }) {
    // const id = params.id;
    const { id } = use(params);

    const [mainImage, setMainImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/products/${id}`);

                if (!res.ok) {
                    if (res.status === 404) notFound();
                    throw new Error(`Failed to fetch product: ${res.status}`);
                }

                const data = await res.json();
                setProduct(data.product);
                setMainImage(data.product?.images?.[0] || null);
                setLoading(false);

                if (!data.product) {
                    notFound();
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
                notFound();
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-pulse text-lg text-gray-300">Loading product details...</div>
            </div>
        );
    }

    if (!product) {
        return notFound();
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-transparent min-h-screen text-gray-100">
            {/* Breadcrumb Navigation */}
            <nav className="bg-gray-900 py-3 px-4 shadow-sm border-b border-gray-700">
                <div className="container mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
                        <FiChevronRight className="h-4 w-4" />
                        <a href="/products" className="hover:text-amber-500 transition-colors">Products</a>
                        <FiChevronRight className="h-4 w-4" />
                        <span className="text-amber-500">{product.name}</span>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div variants={slideUp} className="space-y-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg bg-gray-950/60 border border-gray-800">
                            <Image
                                src={mainImage || "/placeholder-dark.jpg"}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Badges */}
                            {product.inStock && (
                                <div className="absolute top-4 left-4 bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                                    In Stock
                                </div>
                            )}
                            {product.warranty && (
                                <div className="absolute top-4 right-4 bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                                    {product.warranty} Warranty
                                </div>
                            )}
                        </motion.div>

                        {/* Thumbnail Carousel */}
                        {product.images?.length > 1 && (
                            <div className="relative">
                                <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide">
                                    {product.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setMainImage(image)}
                                            className={`relative h-20 w-20 min-w-[80px] rounded-lg overflow-hidden cursor-pointer border-2 ${mainImage === image ? 'border-amber-500' : 'border-gray-700'
                                                }`}>
                                            <Image
                                                src={image}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div variants={slideUp} className="space-y-6">
                        <div className="bg-gray-950/60 p-6 rounded-xl shadow-sm border border-gray-800">
                            <div className="border-b border-gray-700 pb-4 mb-4">
                                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                                <div className="flex items-center mt-2">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-400 ml-2">(24 reviews)</span>
                                </div>
                                <p className="text-2xl font-bold text-amber-500 mt-3">
                                    KES {product.price?.toLocaleString()}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="font-semibold text-lg mb-2 text-white">Description</h2>
                                <p className="text-gray-300 whitespace-pre-line">{product.description}</p>
                            </div>

                            {/* Features */}
                            {product.features?.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="font-semibold text-lg mb-2 text-white">Key Features</h2>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <motion.li
                                                key={index}
                                                variants={slideUp}
                                                className="flex items-start text-gray-300"
                                            >
                                                <span className="text-green-400 mr-2">✓</span>
                                                <span>{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Colors */}
                            {product.colors?.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="font-semibold text-lg mb-3 text-white">Available Colors</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex flex-col items-center"
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full border-2 border-gray-600 cursor-pointer"
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                    title={color}
                                                />
                                                <span className="text-xs mt-1 text-gray-400">{color}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart */}
                            <div className="mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-300"
                                >
                                    <FiShoppingCart className="h-5 w-5" />
                                    <span>Add to Cart</span>
                                </motion.button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-gray-950/60 p-6 rounded-xl shadow-sm border border-gray-800">
                            <h2 className="font-semibold text-lg mb-4 text-white">Product Details</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400">Brand</p>
                                    <p className="font-medium text-white">{product.brand}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Material</p>
                                    <p className="font-medium text-white">{product.material}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Category</p>
                                    <p className="font-medium text-white">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Seating Capacity</p>
                                    <p className="font-medium text-white">{product.seatingCapacity} persons</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Reviews Section */}
                <motion.section
                    variants={fadeIn}
                    className="mt-16 bg-gray-950/60 p-6 rounded-xl shadow-sm border border-gray-800"
                >
                    <h2 className="text-2xl font-bold mb-6 text-white">Customer Reviews</h2>
                    {product.reviews?.length > 0 ? (
                        <div className="space-y-6">
                            {product.reviews.map((review, index) => (
                                <motion.div
                                    key={index}
                                    variants={slideUp}
                                    className="border-b border-gray-700 pb-4 last:border-0"
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-amber-400">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <FiStar key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium ml-2 text-white">{review.author}</span>
                                        <span className="text-xs text-gray-400 ml-auto">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-300">{review.comment}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.p variants={slideUp} className="text-gray-400 text-center py-8">
                            No reviews yet. Be the first to review this product!
                        </motion.p>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 border border-amber-600 text-amber-500 hover:bg-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-300"
                    >
                        Write a Review
                    </motion.button>
                </motion.section>
            </div>
        </motion.div>
    );
}
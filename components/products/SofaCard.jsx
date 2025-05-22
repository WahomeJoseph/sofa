'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { addToCart } from '@/lib/features/Cartslice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Zap, Check } from 'lucide-react';

export const SofaCard = ({ product }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);

    const handleWishList = () => {
        setWishlisted(!wishlisted);
        if (wishlisted) {
            toast.error('Removed from wishlist');
        } else {
            toast.success('Added to wishlist');
        }
    }

    const handleCart = () => {
        setLoading(true);
        try {
            dispatch(
                addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    stockQuantity: product.stockQuantity,
                    inStock: product.inStock,
                })
            );
            toast.success(`${product.name} added to cart!`, {
                description: formatPrice(product.price)
            });
        } catch (error) {
            toast.error('Failed to add to cart');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Card className="group relative h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-200">
            {/* Wishlist button */}
            <button
                onClick={() => handleWishList()}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/60 backdrop-blur-xs shadow-sm hover:bg-amber-50 transition-colors"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                <Heart
                    className={`h-5 w-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                    strokeWidth={1.5} />
            </button>

            {/* Quick view button */}
            <Link
                href={`/products/${product._id}`}
                className="absolute top-12 right-3 z-10 p-2 mt-1 rounded-full bg-white/60 backdrop-blur-sm shadow-sm hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
                aria-label={`Quick view ${product.name}`}>
                <Eye className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
            </Link>

            <CardHeader className="p-0 relative">
                <Link href={`/products/${product._id}`} aria-label={`View details for ${product.name}`}>
                    <div className="relative aspect-square w-full overflow-hidden">
                        <Image
                            src={product?.images?.length > 0 ? product.images[0] : '/placeholder.jpg'}
                            alt={product?.name || 'Sofa Image'}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                            {!product.inStock && (
                                <Badge variant="destructive" className="px-2 py-0.5 text-xs">
                                    Out of Stock
                                </Badge>
                            )}
                            {product.stockQuantity < 5 && product.inStock && (
                                <Badge className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800">
                                    Only {product.stockQuantity} left
                                </Badge>
                            )}
                        </div>
                    </div>
                </Link>
            </CardHeader>

            <CardContent className="flex-grow p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug">
                        {product.name}
                    </CardTitle>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-600">
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-sm font-light text-gray-500">
                        {product.seatingCapacity} {product.seatingCapacity === 1 ? 'seater' : 'seater'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-light text-gray-500">Available Colors:</span>
                    <div className="flex flex-wrap gap-1">
                        {product.colors.map((color, index) => (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div
                                            className="w-4 h-4 rounded-full border border-gray-200"
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            aria-label={`Color: ${color}`}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p className="text-xs">{color}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="line-clamp-1">
                        {product.features.slice(0, 8).join(' • ')}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    {product.inStock ? (
                        <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">In Stock</span>
                        </>
                    ) : (
                        <span className="text-red-500">Out of Stock</span>
                    )}
                </div>
            </CardContent>

            {/* Add to cart button */}
            <CardFooter className="p-4 border-t border-gray-100">
                <Button
                    onClick={handleCart}
                    className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                    disabled={loading || !product.inStock}
                    aria-label={`Add ${product.name} to cart`}>
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};
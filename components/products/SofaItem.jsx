'use client'
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
// import { useState } from "react";

export default function ProductItem({ id, slug, name, description, price, image, material, color, in_stock }) {
    // const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart()
    const handleAddToCart = () => { //add sofa to the cart
        if (in_stock) {
            addToCart({ id, slug, name, description, price, image, material, color, in_stock })
        }
    }

    // format price to display currency
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return (
        <section className="flex flex-col w-full max-w-sm bg-transparent hover:scale-105 overflow-hidden rounded-lg  border border-gray-800 transition duration-300">
            <div className="relative h-50 w-full m-auto bg-transparent">
                <Link href={`/shop/${slug}`}>
                    <Image src={image} alt={name} fill className="object-cover hover:scale-101 transform transition-all duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </Link>
            </div>

            {/* product details */}
            <div className="p-4">
                <h2 className="text-[1.15rem] font-bold text-gray-400 mb-2">{name}</h2>
                <p className="text-gray-500 text-sm mb-4">{description}</p>

                <div className="flex space-x-4 mb-4">
                    <span className="text-sm text-gray-700"><span className="font-bold text-gray-500">Material:</span> {material}</span>
                    <span className="text-sm text-gray-700"><span className="font-bold text-gray-500">Color:</span> {color}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-700">
                        {formattedPrice}
                    </span>
                    <span className={`text-sm font-bold ${in_stock ? "text-green-700" : "text-red-700"}`} >
                        {in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* add to cart button */}
                <button
                    disabled={!in_stock}
                    onClick={handleAddToCart}
                    className={`w-full py-3 uppercase px-4 ${in_stock
                        ? "bg-transparent border border-amber-600 text-amber-600 hover:border-gray-800 hover:text-gray-900 hover:font-bold hover:bg-amber-700 cursor-pointer transition-all transition-ease-in-out duration-300"
                        : "bg-gray-700 text-gray-[#ddd6cb] cursor-not-allowed"
                        } text-[#ddd6cb] text-base rounded-full transition-colors duration-300`}>
                    {in_stock ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </section>
    );
}
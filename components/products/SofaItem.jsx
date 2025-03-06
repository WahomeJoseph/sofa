'use client'

import Image from "next/image";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { MdOutlineRemove } from "react-icons/md";

export default function ProductItem({ name, description, price, image, material, color, in_stock }) {
    const [quantity, setQuantity] = useState(1);

    // quantity increase
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // quantity decrease
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    // Format price to display currency
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return (
        <section className="flex flex-col w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-50 w-full">
                <Image src={image} alt={name} fill className="object-cover hover:scale-110 transform transition-all duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>

            {/* Product Details */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{name}</h2>
                <p className="text-gray-600 text-sm mb-4">{description}</p>

                <div className="flex space-x-4 mb-4">
                    <span className="text-sm text-gray-500"><span className="font-bold text-gray-900">Material:</span> {material}</span>
                    <span className="text-sm text-gray-500"><span className="font-bold text-gray-900">Color:</span> {color}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">
                        {formattedPrice}
                    </span>
                    <span className={`text-sm font-bold ${in_stock ? "text-green-700" : "text-red-700"}`} >
                        {in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex w-full items-center px-3 py-1 rounded-lg mb-3 space-x-3 border border-gray-300 shadow-sm justify-around">
                    <button onClick={decreaseQuantity} className="p-2 text-gray-900 border-r">
                        < MdOutlineRemove size={22} className="hover:bg-gray-100"/>
                    </button>
                    <span className="text-gray-900 text-xl">{quantity}</span>
                    <button onClick={increaseQuantity} className="p-2 text-gray-900 border-l">
                        <MdAdd size={22} className="transition-colors"/>
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    disabled={!in_stock}
                    className={`w-full py-2 px-4 ${in_stock
                        ? "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                        } text-[#ddd6cb] font-bold rounded-lg transition-colors duration-300`}>
                    {in_stock ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </section>
    );
}
'use client'
import Link from "next/link";
import { useCart } from "@/context/CartContext"
import { IoCartOutline } from "react-icons/io5";
import { Suspense } from "react";
import Loader from "@/components/loader/Loader";

export default function CartIcon() {
    const { cart } = useCart()
    return (
            <Link href="/shop/cart">
                <button className="flex relative text-amber-600 p-1 justify-end cursor-pointer rounded-full">
                    <IoCartOutline size={30} />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                            {cart.length}
                        </span>
                    )}
                </button>
            </Link>
    )
}
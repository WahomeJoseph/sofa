'use client'
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useFormStatus } from 'react-dom'

import { TiArrowBackOutline } from "react-icons/ti";
import { MdAdd } from "react-icons/md";
import { MdOutlineRemove } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

export default function Cart() {
    const { pending } = useFormStatus()

    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            <section className="bg-transparent h-screen border-t-2 border-gray-800 my-20 md:mx-[10rem] sm:mx-[4rem] rounded-sm p-10">
                <header className="flex flex-row items-center justify-between mb-10 p-1">
                    <h1 className="text-[1.5rem] pl-4 uppercase text-[#ddd6cb]">My Sofa Cart</h1>
                    <Link href="/shop">
                        <button className="flex text-amber-600 cursor-pointer rounded-full mr-3 border border-gray-800 hover:bg-amber-600 hover:text-gray-900">
                            <p className="flex items-center space-x-2 p-2">
                                <TiArrowBackOutline size={30} />
                                <span className="uppercase text-base">Products Page</span>
                            </p>
                        </button>
                    </Link>
                </header>

                {/* main */}
                <main className="mx-auto p-4">
                    {cart.length === 0 ? (
                        <p className="text-xl text-amber-600 tracking-wide">Your Cart is Empty 😰 🥵. Proceed to Products Page!</p>
                    ) : (
                        <>
                            <div className="overflow-y-auto overflow-x-auto">
                                <table className="min-w-full border border-gray-800">
                                    <thead>
                                        <tr className="bg-gray-950 border-b border-gray-800">
                                            <th className="px-6 py-3 text-center text-sm font-medium text-[#ddd6cb] uppercase tracking-wider">Item image</th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-[#ddd6cb] uppercase tracking-wider">Item name</th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-[#ddd6cb] uppercase tracking-wider">Quantity</th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-[#ddd6cb] uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 text-center text-sm font-medium text-[#ddd6cb] uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    {/* table body */}
                                    <tbody className="divide-y divide-gray-800">
                                        {cart.map((item) => (
                                            <tr key={item.id} className="p-3 px-12 mb-10 rounded-xs items-center">
                                                {/* image */}
                                                <td className="p-5">
                                                    <div className="flex justify-center">
                                                        <Image src={item.image} alt={item.name} width={100} height={100}
                                                            className="object-cover" />
                                                    </div>
                                                </td>
                                                {/* name */}
                                                <td className="p-5">
                                                    <h2 className="text-base text-[#ddd6cb] text-center">{item.name}</h2>
                                                </td>
                                                {/* quantity */}
                                                <td className="p-5">
                                                    <div className="flex items-center justify-center rounded-md mb-2 space-x-4 border border-gray-800 shadow-sm">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 text-[#ddd6cb] border-r border-gray-800">
                                                            <MdOutlineRemove size={22} className="hover:bg-gray-800 rounded" />
                                                        </button>
                                                        <span className="text-amber-600 text-xl">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 text-[#ddd6cb] border-l border-gray-800">
                                                            <MdAdd size={22} className="hover:bg-gray-800 rounded" />
                                                        </button>
                                                    </div>
                                                    <p className="text-base text-center text-gray-500">Quantity: {item.quantity}</p>
                                                </td>
                                                {/* total */}
                                                <td className="p-5">
                                                    <p className="text-base text-[#ddd6cb] text-center">
                                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        }).format(item.price * item.quantity)}
                                                    </p>
                                                </td>

                                                <td className="p-2">
                                                    <div className="flex flex-col p-0 justify-center items-center group">
                                                        <div onClick={() => removeFromCart(item.id)}
                                                            className="text-center text-red-500 transition-transform duration-300 group-hover:scale-85 group-hover:origin-top">
                                                            <RiDeleteBin2Fill size={26} />
                                                        </div>
                                                        <span className="text-red-500 text-base opacity-0 transition-opacity duration-300 group-hover:opacity-100">Remove From Cart</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Almost There */}
                            <div className="mt-8">
                                <p className="flex justify-end text-xl p-1 text-[#ddd6cb]">
                                    Total: {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(totalPrice)}
                                </p>
                                <div className="w-full flex p-2 justify-between space-x-10 mr-2">
                                    {/* <button
                                        onClick={clearCart}
                                        className="bg-red-600 text-[#ddd6cb] cursor-pointer px-4 py-2 rounded-md">
                                        {pending ? 'Clearing Cart' : 'Clear Cart'}
                                    </button> */}
                                    <Link href='/shop/pay'>
                                        <button
                                            className="bg-transparent border hover:bg-amber-600 hover:text-gray-950 text-amber-600 uppercase text-base cursor-pointer px-4 py-2 rounded-md">
                                            {pending ? 'Checking Out...' : 'Pay Now'}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </section>

        </>
    )
}
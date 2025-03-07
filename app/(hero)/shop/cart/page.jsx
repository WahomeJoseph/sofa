'use client'
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { GiBackwardTime } from "react-icons/gi";
import { MdAdd } from "react-icons/md";
import { MdOutlineRemove } from "react-icons/md";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            <header className="flex justify-end p-2 mx-4">
                <Link href="/shop">
                    <button className="flex text-amber-600 mt-2 cursor-pointer rounded-full border hover:shadow-sm shadow-amber-500">
                        <p className="flex space-x-2 p-2">
                            <GiBackwardTime size={30} />
                            <span className="text-xl">Products Page</span>
                        </p>
                    </button>
                </Link>
            </header>

            <section className="container mx-auto p-4">
                <h1 className="text-[2rem] text-[#ddd6cb] font-bold mb-4">My Sofa Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-xl text-amber-600 tracking-wide">Your Cart is Empty 😰 🥵. Proceed to Products Page!</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-gray-500 rounded-b pb-4">
                                    <div>
                                        <h2 className="text-xl text-[#ddd6cb] font-semibold">{item.name}</h2>
                                        <p className="text-xl text-gray-500">Quantity: {item.quantity}</p>
                                        {/* <div className="text-gray-600">Image: {item.image}</div> */}
                                    </div>

                                    <div className="flex flex-col items-center space-y-3 space-x-4">
                                        {/* quantity selector */}
                                        <div className="flex items-center rounded-md mb-3 space-x-3 border border-gray-500 shadow-sm">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 text-[#ddd6cb] border-r border-gray-500">
                                                <MdOutlineRemove size={22} className="hover:bg-gray-800 rounded" />
                                            </button>
                                            <span className="text-amber-600 text-xl">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 text-[#ddd6cb] border-l border-gray-500">
                                                <MdAdd size={22} className="hover:bg-gray-800 rounded" />
                                            </button>
                                        </div>

                                        <div>
                                            <p className="text-lg text-[#ddd6cb] font-bold">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }).format(item.price * item.quantity)}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-600 hover:text-red-800">
                                                Remove from cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Almost There */}
                        <div className="mt-8">
                            <p className="text-2xl text-[#ddd6cb] font-bold">
                                Total: {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(totalPrice)}
                            </p>
                            <button
                                onClick={clearCart}
                                className="bg-red-600 text-[#ddd6cb] px-4 py-2 rounded-lg mt-4">
                                Clear Cart
                            </button>
                            <Link href='shop/pay'>
                                <button
                                    // onClick={() => alert('Proceed to checkout')}
                                    className="bg-amber-600 text-[#ddd6cb] px-4 py-2 rounded-lg mt-4 ml-4">
                                    Checkout
                                </button>
                            </Link>

                        </div>
                    </>
                )}
            </section>
        </>
    )
}
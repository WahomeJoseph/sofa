'use client';
import { useCart } from '@/context/CartContext';
import Pay from '@/components/pay/Pay';

export default function Payment() {
    const { cart, clearCart } = useCart();

    // calculate the total price 
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            <div className="container mx-auto bg-transparent mt-10 p-3">
                <h2 className="text-2xl text-center text-amber-600 font-bold my-5">Make Your Payment Here</h2>
                <div className="bg-neutral-950 border border-t-2 border-gray-900 p-3 mx-[20rem] rounded-lg shadow-md">
                    <h2 className="text-xl text-[#ddd6cb] text-center my-3 mt-3">Order Summary</h2>
                    <div className="space-y-3 border-t border-gray-800">
                        {cart.map((item) => (
                            <div key={item.id} className="flex w-full justify-between rounded-xs items-center hover:bg-gray-950 hover:text-[#ddd6cb] p-2">
                                <div>
                                    <h3 className="text-base font-bold text-[#ddd6cb]">{item.name}</h3>
                                    <p className="text-base text-gray-800">Quantity: {item.quantity}</p>
                                </div>

                                <p className="text-base text-amber-600 font-bold">
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(item.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* total price */}
                    <div className="mt-4">
                        <p className="flex justify-between text-xl text-[#ddd6cb] border-t rounded-sm border-gray-800 mt-2 p-1 mb-4">
                            <span className='text-amber-600'>Total:</span>
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(totalPrice)}
                        </p>
                    </div>
                    <Pay />
                </div>
            </div>
        </>

    );
}
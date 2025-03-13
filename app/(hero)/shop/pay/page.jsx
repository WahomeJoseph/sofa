'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
// import { redirect } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';

// import { FaPaypal } from "react-icons/fa6";
// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const { cart, clearCart } = useCart();
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const handleChangePay = (e) => {
        setSelectedPayment(e.target.value)
        setOpenModal(true)
    }

    // calculate the total price 
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    // mpesa payment 
    const handleMPay = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://localhost:2700/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                    amount: totalPrice,
                }),
            })

            const data = await response.json()
            if (data.error) {
                alert('Payment failed. Try again!')
            } else {
                alert('Payment successfully initiated. Wait for phone prompt.')
                clearCart()
                setOpenModal(false)
                // redirect('/shop')
            }
        } catch (error) {
            console.log('Payment failed. Try again!', error)
            alert('Payment failed. Try again!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="container mx-auto bg-transarent mt-10 p-4">
                <h2 className="text-2xl text-center text-amber-600 font-bold mb-5">Make Payment Here</h2>

                <form className="bg-transparent h-screen border border-t-2 border-gray-800 p-3 mx-[20rem] rounded-lg shadow-md">
                    <h2 className="text-xl text-[#ddd6cb] text-center my-6 mt-3">Order Summary</h2>
                    <div className="space-y-3">
                        {cart.map((item) => (
                            <div key={item.id} className="flex w-full justify-between rounded-xs items-center hover:bg-gray-950 hover:text-[#ddd6cb] p-2">
                                <div>
                                    <h3 className="text-base font-bold">{item.name}</h3>
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
                        <p className="flex justify-evenly text-xl text-[#ddd6cb] p-1 mb-4">
                            <span className='text-amber-600'>Total:</span>
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(totalPrice)}
                        </p>
                    </div>

                    <div className='flex flex-wrap justify-center'>
                        <select
                            name="paymode"
                            id="paymode"
                            value={selectedPayment}
                            onChange={handleChangePay}
                            className='uppercase  border border-gray-800 rounded-md text-amber-600 p-2 focus:outline-none'>
                            <option value="pay">Select mode of payment</option>
                            <option value="mpesa">M-pesa</option>
                            <option value="paypal">PayPal</option>

                            <option value="stripe">Stripe</option>
                        </select>
                    </div>

                </form>

                {/* mpesa payment method */}
                <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                    {selectedPayment === 'mpesa' && (
                                <form className='w-full bg-gray-900 p-8 rounded-lg shadow-lg'>
                                    <article className='grid grid-cols-1 space-y-3 p-2'>
                                        <h2 className='text-base text-amber-600 uppercase text-center'><span className='text-green-600'>safaricon</span> Not the best option</h2>
                                        <div className='mb-4'>
                                            <label htmlFor='name' className='block text-base text-[#ddd6cb] mb-2'>Phone Number:</label>
                                            <input
                                                type='text'
                                                id='phone'
                                                value={phone}
                                                placeholder='Enter your phone number'
                                                onChange={(e) => setPhone(e.target.value)}
                                                className='w-full border border-gray-800 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline-none'
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor='name' className='block text-base text-[#ddd6cb] mb-2'>Total Amount:</label>
                                            <input
                                                type='text'
                                                id='name'
                                                defaultValue={totalPrice}
                                                className='w-full border border-gray-800 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline-none'
                                            />
                                        </div>
                                    </article>

                                    <div
                                        type='submit'
                                        onClick={handleMPay}
                                        disabled={loading || !phone}
                                        className='w-full bg-transparent border border-amber-600 text-amber-600 text-[#ddd6cb] text-center text-xl cursor-pointer p-2 rounded-full hover:text-gray-950 hover:bg-amber-600'>
                                        {loading ? 'Processing...' : 'Pay Here'}
                                    </div>
                                </form>
                    )}
                </Modal>

            </div>
        </>

    );
}
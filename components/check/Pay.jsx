import { useEffect, useState } from "react";
import { FaGooglePay } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa6";
import { FaMobileScreenButton } from "react-icons/fa6";

import { useCart } from '@/context/CartContext';
import Modal from '@/components/modal/Modal.jsx'
import Success from "../toasts/Success";
import Failed from "../toasts/Failed";

export default function Pay() {
    const { cart, clearCart } = useCart();
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [failedToast, setFailedToast] = useState(false)

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleChangePay = (e) => {
        setSelectedPayment(e.target.value)
        setOpenModal(true)
    }
    // mpesa payment 
    const handleMPay = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://localhost:2750/token', {
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
                setFailedToast(true)
            } else {
                setSuccessToast(true)
                clearCart()
                setOpenModal(false)
            }
        } catch (error) {
            console.log('Payment failed. Try again!', error)
            setFailedToast(true)
        } finally {
            setLoading(false)
        }
    }
    // other payment logics

    // autodismiss the toasts
    useEffect(() => {
        console.log('successToast changed:', successToast);
        if (successToast) {
            const timer = setTimeout(() => {
                console.log('Dismissing success toast');
                setSuccessToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successToast]);

    useEffect(() => {
        if (failedToast) {
            console.log('FailedToast changed:', failedToast);
            const timer = setTimeout(() => {
                console.log('Dismissing failed toast');
                setFailedToast(false)
            }, 5000)
            return clearTimeout(timer)
        }
    }, [failedToast])

    return (
        <>
        {successToast && (
            <div className="fixed flex items-center top-5 right-5 z-50"><Success /></div>
        )}
        {failedToast && (
            <div className="fixed flex items-center top-5 right-5 z-50"><Failed /></div>
        )}
            <div className='w-full m-0 p-0'>
                <div className="w-full p-3 rounded-xl shadow border border-gray-900 flex flex-col items-center justify-center gap-4 bg-gray-950">
                    <p className="uppercase text-[#ddd6cb] font-bold self-start">Choose Payment method</p>
                    {/* mpesa */}
                    <label
                        className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent has-[:checked]:border-amber-500 has-[:checked]:text-amber-900 has-[:checked]:bg-amber-50 has-[:checked]:font-bold hover:text-gray-900 hover:bg-[#ddd6cb] transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden"
                    >
                        <div className="inline-flex items-center justify-center gap-2 relative z-10">
                            <FaMobileScreenButton size="32" />
                            <p className="font-bold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-400 opacity-0">
                                Mpesa
                            </p>
                        </div>
                        <input
                            id="payment"
                            value="mpesa"
                            checked={selectedPayment === 'mpesa'}
                            onChange={handleChangePay}
                            type="radio"
                            name="payment"
                            className="checked:text-amber-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                        />
                    </label>

                    {/* google pay */}
                    <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent has-[:checked]:border-amber-500 has-[:checked]:text-amber-900 has-[:checked]:bg-amber-50 has-[:checked]:font-bold hover:text-gray-900 hover:bg-[#ddd6cb] transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden">
                        <div className="inline-flex items-center justify-center gap-2 relative z-10">
                            <FaGooglePay size="32" />
                            <p className="font-semibold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-700 opacity-0">
                                Google Pay
                            </p>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            value="google"
                            className="checked:text-amber-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                        />
                    </label>

                    {/* paypal */}
                    <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent has-[:checked]:border-amber-500 has-[:checked]:text-amber-900 has-[:checked]:bg-amber-50 has-[:checked]:font-bold hover:text-gray-900 hover:bg-[#ddd6cb] transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&_p]:has-[:checked]:translate-y-0 [&_p]:has-[:checked]:transition-transform [&_p]:has-[:checked]:duration-500 [&_p]:has-[:checked]:opacity-100 overflow-hidden">
                        <div className="inline-flex items-center justify-center gap-2 relative z-10">
                            <FaCcPaypal size="32" />
                            <p className="font-semibold absolute inset-0 w-full whitespace-nowrap translate-y-[110%] translate-x-full top-1 left-2 transition-all duration-700 opacity-0">
                                Paypal
                            </p>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            className="checked:text-amber-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                        />
                    </label>
                </div>

                {/* mpesa payment method */}
                <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                    {selectedPayment === 'mpesa' && (
                        <form className='w-full bg-gray-900 p-8 rounded-lg shadow-lg'>
                            <article className='grid grid-cols-1 space-y-3 p-2'>
                                <h2 className='text-base text-amber-600 uppercase text-center'><span className='text-green-600'>Mpesa</span> the best option</h2>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-base text-[#ddd6cb] mb-2'>Phone Number:</label>
                                    <input
                                        type='text'
                                        id='phone'
                                        name="phone"
                                        value={phone}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        placeholder='0795969757'
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '')
                                            setPhone(value)
                                        }}
                                        className='w-full border border-gray-800 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline focus:outline-amber-600'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-base text-[#ddd6cb] mb-2'>Total Amount:</label>
                                    <input
                                        type='text'
                                        id='amount'
                                        name="amount"
                                        readOnly
                                        defaultValue={totalPrice.toFixed(2)}
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

                {/* other payment methods */}
            </div>
        </>
    )
}

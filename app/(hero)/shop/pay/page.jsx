// 'use client';

// import { loadStripe } from '@stripe/stripe-js';
// import { useCart } from '@/context/CartContext';
// import { useEffect, useState } from 'react';

// import { FaPaypal } from "react-icons/fa6";
// // import { FaRegCreditCard } from "react-icons/fa";

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

// export default function Payment() {
//     const { cart, clearCart } = useCart();
//     const [loading, setLoading] = useState(false);

//     // Calculate the total price of all items in the cart
//     const totalPrice = cart.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     // Handle payment
//     const handlePayment = async (paymentMethod) => {
//         setLoading(true);

//         try {
//             // Create a checkout session on the server
//             const response = await fetch('/api/create-checkout-session', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     cart,
//                     paymentMethod,
//                 }),
//             });

//             const session = await response.json();

//             // Redirect to Stripe Checkout
//             const stripe = await stripePromise;
//             const { error } = await stripe.redirectToCheckout({
//                 sessionId: session.id,
//             });

//             if (error) {
//                 console.error('Error redirecting to checkout:', error);
//                 alert('Payment failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error during payment:', error);
//             alert('Payment failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="container mx-auto bg-transarent mt-10 p-4">
//                 <h2 className="text-3xl text-center font-bold mb-5">Make Payment Here</h2>

//                 <form className="bg-gray-950 border-t-2 border-gray-800 h-[30rem] p-6 mx-[20rem] rounded-lg shadow-md">
//                     <h2 className="text-xl font-semi-bold mb-4">Order Summary</h2>
//                     <div className="space-y-4">
//                         {cart.map((item) => (
//                             <div key={item.id} className="flex justify-between items-center border-b pb-4">
//                                 <div>
//                                     <h3 className="text-lg font-semibold">{item.name}</h3>
//                                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                                 </div>
//                                 <p className="text-lg font-bold">
//                                     {new Intl.NumberFormat('en-US', {
//                                         style: 'currency',
//                                         currency: 'USD',
//                                     }).format(item.price * item.quantity)}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                     {/* total price */}
//                     <div className="mt-8">
//                         <p className="text-2xl font-semi-bold">
//                             Total: {new Intl.NumberFormat('en-US', {
//                                 style: 'currency',
//                                 currency: 'USD',
//                             }).format(totalPrice)}
//                         </p>
//                     </div>
//                     {/* choose payment method */}
//                     <div className="mt-8">
//                         <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
//                         <div className="grid grid-cols-3 gap-4">
//                             <button
//                                 onClick={() => handlePayment('stripe')}
//                                 disabled={loading}
//                                 className="w-full bg-amber-600 text-[#ddd6cb] px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-300">
//                                 {loading ? 'Processing...' : 'Pay with Stripe'}
//                             </button>
//                             <button
//                                 onClick={() => handlePayment('paypal')}
//                                 disabled={loading}
//                                 className="w-full bg-blue-600 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
//                                 {loading ? 'Processing...' : <FaPaypal />}
//                             </button>
//                             <button
//                                 onClick={() => handlePayment('paypal')}
//                                 disabled={loading}
//                                 className="w-full bg-blue-600 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
//                                 {loading ? 'Processing...' : <FaPaypal />}
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>

//     );
// }
// "use client"
// import Image from 'next/image';
// import { TriangleAlert } from "lucide-react";
// import toast from 'react-hot-toast';
// import { useFormStatus } from 'react-dom';
// import { useState } from 'react';
// import { Toaster } from 'sonner';

// export default function Contact({ user }) {
//     const { pending } = useFormStatus();
//     const [isPending, setIsPending] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState("");
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         message: ''
//     })
//     const validateForm = () => {
//         const newErrors = {};

//         if (!form.name) newErrors.name = "Name is required";
//         if (!form.email) newErrors.email = "Email is required";
//         if (!form.phone) newErrors.phone = "Phone number is required";
//         if (!form.address) newErrors.address = "Address is required";
//         if (!form.message) newErrors.message = "Message is required";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             toast.error("Please fix the errors in the form", { id: "contact", duration: 5000 });
//             return;
//         }

//         setIsPending(true);
//         try {
//             const res = await fetch('/api/contact', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(form),
//             })
//             const data = await res.json();

//             if (res.ok) {
//                 setForm({ name: "", email: "", phone: "", address: "", message: "" });
//                 setErrors({});
//                 redirect("/");
//                 setMessage("Subscribed successfully! Check your email for confirmation.");
//                 setTimeout(() => {
//                     setMessage(''),
//                         setStatus(null)
//                 }, 5000)
//             } else {
//                 toast.error(data.error || "Failed to submit form", { id: "contact", duration: 4000 });
//             }
//         } catch (error) {
//             setTimeout(() => {
//                 setMessage("");
//             }, 5000);
//             toast.error("An unexpected error occurred.", { id: "contact", duration: 4000 });
//         } finally {
//             setIsPending(false);
//         }
//     };
//     return (
//         <>
//             <section className='relative h-screen flex flex-col'>
//                 <Toaster />
//                 <div className='md:h-1/2 sm:h-2/3 relative opacity-50'>
//                     <Image
//                         src="/contact.jpg"
//                         fill
//                         priority
//                         className='object-cover'
//                         alt='contact image'
//                     />
//                 </div>

//                 <div className='h-1/2 bg-transparent'></div>
//                 <div className='absolute inset-0 flex flex-col items-center justify-center'>
//                     <h2 className='text-[2rem] text-amber-600 font-bold mb-2 text-center'>Contact Us</h2>
//                     <p className='text-[1.1rem] text-[#ddd6cb] font-medium mb-5 text-center'>Explore our Exclusive Sofa Collection. Contact Us To Get Your Sofas</p>

//                     <form onSubmit={handleSubmit} className='bg-gray-900 p-8 rounded-lg shadow-lg w-full md:w-[50rem]'>
//                         <article className='grid grid-cols-2 space-x-3 mb-2 p-2'>
//                             <div className='mb-4'>
//                                 <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Full Name:</label>
//                                 <input id="name"
//                                     type="text"
//                                     placeholder="Your name"
//                                     value={form.name}
//                                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                                     disabled={isPending}
//                                     required
//                                     aria-required="true"
//                                     className='w-full border border-gray-600 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline-none' />
//                                 {errors.name && (
//                                     <div className="flex items-center gap-x-1 text-sm text-amber-600" role="alert">
//                                         <TriangleAlert className="h-4 w-4" />
//                                         <span>{errors.name}</span>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className='mb-4'>
//                                 <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Email:</label>
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     placeholder="you@example.com"
//                                     value={form.email}
//                                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                     disabled={isPending}
//                                     required
//                                     aria-required="true"
//                                     className='w-full border border-gray-600 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline-none' />
//                                 {errors.email && (
//                                     <div className="flex items-center gap-x-1 text-sm text-amber-600" role="alert">
//                                         <TriangleAlert className="h-4 w-4" />
//                                         <span>{errors.email}</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </article>

//                         <article className='grid grid-cols-2 space-x-3 mb-2 p-2'>
//                             <div className='mb-4'>
//                                 <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Phone No:</label>
//                                 <input
//                                     id="phone"
//                                     type="tel"
//                                     placeholder="0712345678"
//                                     value={form.phone}
//                                     onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                                     disabled={isPending}
//                                     required
//                                     aria-required="true"
//                                     pattern="^\+?\d{10,15}$"
//                                     title="Phone number should be in the format +254712345678 or 0712345678"
//                                     className='w-full border rounded-md text-[#ddd6cb] p-3 border-gray-600 bg-gray-950 focus:outline-none' />
//                                 {errors.phone && (
//                                     <div className="flex items-center gap-x-1 text-sm text-amber-600" role="alert">
//                                         <TriangleAlert className="h-4 w-4" />
//                                         <span>{errors.phone}</span>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className='mb-4'>
//                                 <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Address:</label>
//                                 <input id="message"
//                                     placeholder='Enter your address'
//                                     type="text"
//                                     value={form.address}
//                                     onChange={(e) => setForm({ ...form, address: e.target.value })}
//                                     disabled={isPending}
//                                     required
//                                     aria-required="true"
//                                     className='w-full border rounded-md p-3 text-[#ddd6cb] border-gray-600 bg-gray-950 focus:outline-none' />
//                                 {errors.phone && (
//                                     <div className="flex items-center gap-x-1 text-sm text-amber-600" role="alert">
//                                         <TriangleAlert className="h-4 w-4" />
//                                         <span>{errors.address}</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </article>
//                         <div className='my-3'>
//                             <label htmlFor='message' className='block text-base text-[#ddd6cb] mt-2'>Message:</label>
//                             <textarea id="message"
//                                 placeholder='Enter your message'
//                                 type="text"
//                                 maxLength={500}
//                                 value={form.message}
//                                 onChange={(e) => setForm({ ...form, message: e.target.value })}
//                                 disabled={isPending}
//                                 required
//                                 aria-required="true"
//                                 rows={5}
//                                 className='w-full border rounded-md p-3 text-[#ddd6cb] border-gray-600 bg-gray-950 focus:outline-none'
//                             ></textarea>
//                             {errors.message && (
//                                 <div className="flex items-center gap-x-1 text-sm text-amber-600" role="alert">
//                                     <TriangleAlert className="h-4 w-4" />
//                                     <span>{errors.message}</span>
//                                 </div>
//                             )}
//                         </div>
//                         <p className='text-base text-justify mb-2 text-gray-700 font-medium font-sans-montserrat'>
//                             By submitting this form you agree to our <a href=""><span className='text-amber-600'>terms and conditions</span></a> and our <a href=""><span className='text-amber-600'>privacy policy</span></a> which explains how we may collect,
//                             use and disclose your personal information including to third parties.
//                         </p>
//                         <div type='submit' className='w-1/4 bg-amber-600 border border-gray-800 text-gray-950 text-[#ddd6cb] text-center text-2xl cursor-pointer p-2 font-bold rounded-lg hover:bg-amber-700 '>
//                             <button>
//                                 {pending ? 'Submitting...' : 'Contact Us'}
//                             </button>
//                         </div>
//                         {message && (
//                             <p className={`mt-5 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
//                                 {message}
//                             </p>
//                         )}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// };

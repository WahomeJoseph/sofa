import Image from 'next/image';
import form from '@/assets/contact.jpg';
import Submit from '@/components/button/Submit';

// export async function generateMetadata() {
//     return {
//         title: 'Reach Out To Sofa Lux',
//         description: "Elevate Your Living Room and Offices with Quality Sofas.",
//     }
// }

export default function Contact() {
    return (
        <>
            <section className='relative h-screen flex flex-col'>
                <div className='md:h-1/2 sm:h-2/3 relative opacity-50'>
                    <Image src={form} layout='fill' objectFit='cover' alt='contact image' />
                </div>
                
                <div className='h-1/2 bg-transparent'></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <h2 className='text-[2rem] text-amber-600 font-bold mb-2 text-center'>Contact Us</h2>
                    <p className='text-[1.1rem] text-[#ddd6cb] font-medium mb-5 text-center'>Explore our Exclusive Sofa Collection. Contact Us To Get Your Sofas</p>

                    <form className='bg-gray-900 p-8 rounded-lg shadow-lg w-full md:w-[50rem]'>
                        <article className='grid grid-cols-2 space-x-3 mb-2 p-2'>
                            <div className='mb-4'>
                                <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Full Name:</label>
                                <input type='text' id='name' placeholder='Wachira Joseph' className='w-full border border-gray-600 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline-none' />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Email:</label>
                                <input type='text' id='name' placeholder='wachirajoseph@gmail.com' className='w-full border border-gray-600 bg-gray-950 rounded-md text-[#ddd6cb] p-3 focus:outline-none' />
                            </div>
                        </article>

                        <article className='grid grid-cols-2 space-x-3 mb-2 p-2'>
                            <div className='mb-4'>
                                <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Phone No:</label>
                                <input type='text' id='name' placeholder='+254 795 969 757' className='w-full border rounded-md text-[#ddd6cb] p-3 border-gray-600 bg-gray-950 focus:outline-none' />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='name' className='block text-base text-[#ddd6cb]'>Address:</label>
                                <input type='text' id='name' placeholder='Nairobi' className='w-full border rounded-md p-3 text-[#ddd6cb] border-gray-600 bg-gray-950 focus:outline-none' />
                            </div>
                        </article>
                        <div className='my-3'>
                            <label htmlFor='message' className='block text-base text-[#ddd6cb] mt-2'>Message:</label>
                            <textarea id='message' placeholder='Enter your message' className='w-full border rounded-md p-3 text-[#ddd6cb] border-gray-600 bg-gray-950 focus:outline-none' rows='5'></textarea>
                        </div>
                        <p className='text-base text-justify mb-2 font-medium font-sans-montserrat'>
                            By submitting this form you agree to our <a href=""><span className='text-amber-600'>terms and conditions</span></a> and our <a href=""><span className='text-amber-600'>privacy policy</span></a> which explains how we may collect,
                            use and disclose your personal information including to third parties.
                        </p>
                        <div type='submit' className='w-1/4 bg-amber-600 border border-gray-800 text-gray-950 text-[#ddd6cb] text-center text-2xl cursor-pointer p-2 font-bold rounded-lg hover:bg-amber-700 '>
                            <Submit />
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

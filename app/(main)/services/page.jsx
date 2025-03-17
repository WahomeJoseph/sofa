import Image from 'next/image';
import Link from 'next/link';
import orange from '@/assets/orange-sofa.jpg'

export async function generateMetadata() {
    return {
        title: 'Sofa Lux Services and Products',
        description: "Elevate Your Living Room and Offices with Quality Sofas.",
    }
}

export default function Services() {
    return (
        <>
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-[2rem] font-bold text-center mb-8 text-amber-600">Our Services</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="relative drop-shadow-xl overflow-hidden bg-gray-950 p-6 rounded-lg shadow-sm shadow-gray-700 hover:scale-101 hover:translate-y-1 transform-all duration-300">
                            <Image src={orange} alt="Service 3" className="w-full h-40 object-cover rounded-t-md" />
                            <h2 className="text-2xl mt-4 mb-2 text-[#ddd6cb]">Sofa Revamp</h2>
                            <p className="text-[#ddd6cb] mb-4">Give your existing sofas a fresh new look with our professional revamping services.</p>
                            <Link href="/sofa-revamp">
                                <span className="text-amber-600 font-bold hover:underline">Learn More</span>
                            </Link>
                            <div className="absolute w-70 h-50 bg-amber-600 blur-[100px] -left-1/2 -top-1/2"></div>
                        </div>

                        {/* Service 2 */}
                        <div className="relative drop-shadow-xl overflow-hidden bg-gray-950 p-6 rounded-lg shadow-sm shadow-gray-700 hover:scale-101 hover:translate-y-1 transform-all duration-300">
                            <Image src={orange} alt="Service 3" className="w-full h-40 object-cover rounded-t-md" />
                            <h2 className="text-2xl mt-4 mb-2 text-[#ddd6cb]">Custom Sofa Design</h2>
                            <p className="text-[#ddd6cb] mb-4">Design your dream sofa with our custom design services. Choose the fabric, color, and style that fits your space perfectly.</p>
                            <Link href="/custom-sofa-design">
                                <span className="text-amber-600 font-bold hover:underline">Learn More</span>
                            </Link>
                            <div className="absolute w-70 h-50 bg-amber-600 blur-[100px] -right-1/2 -top-1/2"></div>
                        </div>

                        {/* Service 3 */}
                        <div className="relative drop-shadow-xl overflow-hidden bg-gray-950 p-6 rounded-lg shadow-sm shadow-gray-800 hover:scale-101 hover:translate-y-1 transform-all duration-300">
                            <Image src={orange} alt="Service 3" className="w-full h-40 object-cover rounded-t-md" />
                            <h2 className="text-2xl mt-4 mb-2 text-[#ddd6cb]">Sofa Cleaning</h2>
                            <p className="text-[#ddd6cb] mb-4">Keep your sofas looking new with our professional cleaning services, ensuring they stay fresh and spotless.</p>
                            <Link href="/sofa-cleaning">
                                <span className="text-amber-600 font-bold hover:underline">Learn More</span>
                            </Link>
                            <div className="absolute w-70 h-50 bg-amber-600 blur-[100px] -right-1/2 -bottom-1/2"></div>
                        </div>
                    </div>

                    {/* packages */}
                    <div className='w-full items-center'>
                        <h2 className="text-[1.2rem] font-bold text-center mt-8 text-amber-600">Why Our Services</h2>
                        <div className="grid grid-cols-3 md:gap-12 md:mx-18 sm:mx-6 sm:mb-10 sm:gap-4 mb-4 mt-2">
                            <article className="flex flex-col space-x-2 p-3 border border-gray-800 rounded-sm">
                                <h3 className="text-[1.2rem] text-center text-amber-600">Why Choose SofaLux</h3>
                                <span className="text-base text-center text-[#ddd6cb]">Discover the comfort and style your living room and office with our exclusive variety of sofas</span>
                            </article>
                            <article className="flex flex-col space-x-2 p-3 border border-gray-800 rounded-sm">
                                <h3 className="text-[1.2rem] text-center text-amber-600">Why Choose SofaLux</h3>
                                <span className="text-base text-center text-[#ddd6cb]">Discover the comfort and style your living room and office with our exclusive variety of sofas</span>
                            </article>
                            <article className="flex flex-col space-x-2 p-3 border border-gray-800 rounded-sm">
                                <h3 className="text-[1.2rem] text-center text-amber-600">Why Choose SofaLux</h3>
                                <span className="text-base text-center text-[#ddd6cb]">Discover the comfort and style your living room and office with our exclusive variety of sofas</span>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

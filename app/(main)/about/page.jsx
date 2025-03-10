import Image from "next/image";
import Link from "next/link";

import green from '@/assets/green-sofa.jpg'
import classic from '@/assets/classic.jpg'
import gatewood from '@/assets/gatewood.jpg'
import gray from '@/assets/gray-sofa.jpg'
import orange from '@/assets/orange-sofa.jpg'
import seater from '@/assets/one-seater.jpg'

export async function generateMetadata() {
    return {
        title: 'Who is Sofa Lux?',
        description: "Elevate Your Living Room and Offices with Quality Sofas.",
    }
}

export default function About() {
    return (
        <>
            <section className="bg-transparent h-screen flex flex-col space-y-10">
                <h2 className="text-[2rem] tracking-wide text-center text-amber-600">About Sofa Lux?</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    {/* info side */}
                    <div className="flex flex-col mx-10">
                        <article className="flex flex-col items-center p-4 bg-gray-950 max-w-[70rem] border border-gray-800 rounded-sm mt-4 justify-center sm:p-8 w-full">
                            <p className="text-[#ddd6cb] text-base leading-[1.5] text-center">
                                Upgrade your home or office with our luxurious and functional sofas. We also revamp existing furniture with fabric changes to match your unique taste and style. Transform your space with our premium services.
                            </p>
                        </article>
                        <div className="flex text-[1.5rem] p-2 mt-6 sm:justify-start sm:w-full">
                            <Link href='/pricing' className="inline-block mt-3 p-2 rounded-md text-amber-600 border border-gray-800 font-bold hover:border-amber-600">Get Started</Link>
                        </div>

                        <article className="grid grid-cols-4 mt-8 gap-4">
                            <div className="flex flex-col space-x-2 p-3 items-center border-r border-gray-800 rounded-r-sm">
                                <h2 className="text-[1.5rem] text-amber-600">2000+</h2>
                                <span className="text-base text-[#ddd6cb]">Customers</span>
                            </div>
                            <div className="flex flex-col space-x-2 p-3 items-center border-r border-gray-800 rounded-r-sm">
                                <h2 className="text-[1.5rem] text-amber-600">630+</h2>
                                <span className="text-base text-[#ddd6cb]">Projects</span>
                            </div>
                            <div className="flex flex-col space-x-2 p-3 items-center border-r border-gray-800 rounded-r-sm">
                                <h2 className="text-[1.5rem] text-amber-600">1200+</h2>
                                <span className="text-base text-[#ddd6cb]">Orders</span>
                            </div>
                            <div className="flex flex-col space-x-2 p-3 items-center">
                                <h2 className="text-[1.5rem] text-amber-600">4.2 *</h2>
                                <span className="text-base text-[#ddd6cb]">Rating</span>
                            </div>
                        </article>
                    </div>

                    {/* image side */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 p-4">
                        <div className="w-full h-40 relative">
                            <Image src={green} layout="fill" objectFit="cover" alt="green-sofa" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full h-40 relative">
                            <Image src={classic} layout="fill" objectFit="cover" alt="classic-sofa" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full h-40 relative">
                            <Image src={gatewood} layout="fill" objectFit="cover" alt="gatewood" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full h-40 relative">
                            <Image src={gray} layout="fill" objectFit="cover" alt="gray-sofa" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full h-40 relative">
                            <Image src={orange} layout="fill" objectFit="cover" alt="orange-sofa" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full h-40 relative">
                            <Image src={seater} layout="fill" objectFit="cover" alt="gatewood" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </div>
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
            </section>
        </>
    )
}
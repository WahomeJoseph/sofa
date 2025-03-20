import Image from "next/image";
import Link from "next/link";

import green from '@/assets/green-sofa.jpg'
import classic from '@/assets/classic.jpg'
import gatewood from '@/assets/gatewood.jpg'
import gray from '@/assets/gray-sofa.jpg'

import Teams from "../../../components/team/Teams";

// export async function generateMetadata() {
//     return {
//         title: 'Who is Sofa Lux?',
//         description: "Elevate Your Living Room and Offices with Quality Sofas.",
//     }
// }

export default function About() {
    return (
        <>
            <section className="bg-transparent h-screen flex flex-col space-y-10">
                <h2 className="text-[2rem] tracking-wide text-center text-amber-600">About Sofa Lux</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col mx-10">
                        <article className="flex items-center p-4 bg-gray-950 rounded-xl mt-4 justify-center sm:p-8 w-full" style={{boxShadow: '2px  2px 1px 0 rgba(217, 119, 6, 1)'}}>
                            <p className="text-[#ddd6cb] text-base leading-[1.5] text-center">
                                Upgrade your home or office with our luxurious and functional sofas. We also revamp existing furniture with fabric changes to match your unique taste and style. Transform your space with our premium services.
                            </p>
                        </article>
                        <div className="flex text-[1.5rem] p-2 mt-6 sm:justify-start sm:w-full">
                            <Link href='/pricing' className="inline-block mt-3 p-2 rounded-md text-amber-600 border border-gray-800 uppercase hover:rounded-full">Get Started</Link>
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
                    <section>
                        <div className="grid grid-cols-2 gap-10 p-4">
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
                        </div>
                    </section>
                </div>
                <Teams />
            </section>
        </>
    )
}
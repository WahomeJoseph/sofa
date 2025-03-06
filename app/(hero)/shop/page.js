import Link from "next/link";
import { Suspense } from "react"
import SofaGrid from "@/components/products/SofaGrid";
import { getSofas } from "@/utils/Products";
import { IoCartOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

export const metadata = {
    title: 'Sofa Lux Products',
    description: 'Delicious meals, shared by a food-loving community.',
};

// sofadata fetching using a component fnc
const Sofas = async () => {
    const sofas = await getSofas()
    return <SofaGrid sofas={sofas} />
}

export default function Shop() {
    return (
        <>
            <header className="w-[90%] max-w-[95rem] gap-10 mx-10 mt-10 text-[#ddd6cb] text-[1.5rem]">

                <div className="flex w-full justify-between mb-3 p-1 items-center">
                    <ul className='flex flex-col font-montserrat p-2 md:flex-row md:space-x-12'>
                        <li><Link href='/'><FaHome /></Link></li>
                        <li><Link href='/shop'><MdOutlineInventory2 /></Link></li>
                    </ul>

                    <Link href="/shop/cart">
                        <button className="flex relative text-white bg-amber-600 p-1.5 justify-end rounded-full">
                            <IoCartOutline size={28} />
                            {/* <span className="absolute -top-2 left-2 items-center font-bold text-gray-900 p-1 rounded-full">0</span> */}
                        </button>
                    </Link>
                </div>

                <h1 className="font-sans-montserrat mt-4 text-center">Get new ambience and Look
                    <span style={{
                        background: 'linear-gradient(90deg, #f9572a, #ff8a05)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}><span className="text-xl"> from</span> Sofa Lux Shop
                    </span>
                </h1>
            </header >
            <main className="flex flex-col items-center justify-center min-h-screen">
                <Suspense fallback={<span className="font-sans-montserrat mb-20 text-[2rem] text-[#dddfcb] animate-bounce">Loading our products...</span>}>
                    <Sofas />
                </Suspense>
            </main>

        </>

    )
}
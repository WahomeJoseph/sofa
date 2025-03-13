import Link from "next/link";
import { Suspense } from "react"
import SofaGrid from "@/components/products/SofaGrid";
import { getSofas } from "@/utils/Products";
import { FaHome } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import CartIcon from "@/components/cart/CartIcon";

export const metadata = {
    title: 'Sofa Lux Products',
    description: 'Elevate Your Living Room and Offices with Quality Sofas.',
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

                <div className="flex w-full justify-between mb-3 p-1">
                    <ul className='flex font-montserrat p-2 md:flex-row md:space-x-2 sm:gap-14 ml-12'>
                        <li><Link href='/'><FaHome size={28}/></Link></li>
                        <li><Link href='/shop'><MdOutlineInventory2 size={28}/></Link></li>
                    </ul>
                    <CartIcon />
                </div>

                <h1 className="uppercase mt-4 text-xl text-center">Elevate your office and home from
                    <span className="text-amber-600"> Sofa Lux Shop
                    </span>
                </h1>
            </header >

            <main className="flex flex-col items-center justify-center min-h-screen">
                <Suspense fallback={<span className="font-sans-montserrat mb-20 text-[2rem] text-[#dddfcb] animate-bounce">Loading products...</span>}>
                    <Sofas />
                </Suspense>
            </main>

        </>

    )
}
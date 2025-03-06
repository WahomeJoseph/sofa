import Link from "next/link";
import { GiBackwardTime } from "react-icons/gi";
export default function Cart() {
    return (
        <>
            <header className="flex justify-end p-2 mx-4">
                <Link href="/shop">
                    <button className="flex text-amber-600 mt-2 cursor-pointer rounded-full border hover:shadow-sm shadow-amber-500">
                        <p className="flex space-x-2 p-2">
                            <GiBackwardTime size={30} />
                            <span className="text-xl">Continue Shopping </span>
                        </p>
                        {/* <span className="absolute -top-2 left-2 items-center font-bold text-gray-900 p-1 rounded-full">0</span> */}
                    </button>
                </Link>
            </header>

            <section>
                <table>
                    <thead></thead>
                </table>
            </section>
            <h2>Your Cart Items</h2>

        </>
    )
}
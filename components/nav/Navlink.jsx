'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navlink({ href, children }) {
    const path = usePathname()
    return (
        <Link href={href} className={path.startsWith(href) ? 'clip-text p-2 font-bold rounded-sm bg-gradient-to-r from-[#000] to-amber-600' : 'text-[#ddd6cb] font-bold p-2 rounded hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-[#ff8a05] to-[#f9b331] hover:shadow-[0_0_18px_rgba(248,190,42,0.8)]'}>
            {children}
        </Link>
    )
}

'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navlink({ href, children }) {
    const path = usePathname()
    const isActive = href === '/'
     ? path === href 
     : path.startsWith(href) 
     && (path === href || path === `${href}`)
    return (
        <Link href={href} className={isActive
         ? 'clip-text p-2 font-bold rounded-sm bg-amber-600/90' 
         : 'text-[#ddd6cb] font-bold p-2 rounded hover:bg-clip-text hover:text-amber-600 hover:bg-gradient-to-r from-[#ff8a05] to-[#f9b331]'}>
            {children}
        </Link>
    )
}

'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { FiMenu, FiX, FiShoppingBag, FiUser } from 'react-icons/fi'
import { RiCustomerService2Line } from 'react-icons/ri'
import { IoMdHome } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import AccountNav from '../sign/Account'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeHover, setActiveHover] = useState(null)
    const navRef = useRef(null)
    const pathname = usePathname()

    const { scrollY } = useScroll()
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    useEffect(() => {
        setIsOpen(false)
        document.body.style.overflow = 'auto'
    }, [pathname])

    const navItems = [
        { name: 'Home', path: '/', icon: <IoMdHome /> },
        { name: 'Services', path: '/services', icon: <RiCustomerService2Line /> },
        { name: 'Shop', path: '/products', icon: <FiShoppingBag /> },
    ]

    const hoverVariants = {
        initial: { width: 0 },
        hover: { width: '100%' }
    }

    return (
        <motion.header
            ref={navRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'text-gray-900 backdrop-blur-xl shadow-sm' : 'bg-transparent text-[#ddd6cb]'
                }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                <Link href="/" className="relative group">
                    <motion.span
                        className="text-3xl font-bold text-[#ddd6cb]"
                        whileHover={{ scale: 1.05 }}>
                        Sofa<span className="text-amber-600">Lux</span>
                    </motion.span>
                    <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-amber-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                    />
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.path}
                            className="relative"
                            onHoverStart={() => setActiveHover(item.path)}
                            onHoverEnd={() => setActiveHover(null)}>
                            <Link
                                href={item.path}
                                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium ${pathname === item.path ? 'text-amber-600' : 'text-[#ddd6cb] hover:text-[#ddd6cb]'
                                    }`}>
                                <span className="text-lg">{item.icon}</span>
                                {item.name}
                            </Link>

                            {activeHover === item.path && (
                                <motion.div
                                    layoutId="navHover"
                                    className="absolute bottom-0 left-0 h-0.5 bg-amber-600"
                                    initial="initial"
                                    animate="hover"
                                    variants={hoverVariants}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                />
                            )}
                        </motion.div>
                    ))}

                    <AccountNav />
                </nav>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => {
                        setIsOpen(!isOpen)
                        document.body.style.overflow = isOpen ? 'auto' : 'hidden'
                    }}
                    className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 focus:outline-none"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle menu">
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                            />

                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 overflow-y-auto">
                                <div className="flex flex-col h-full px-6 py-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <Link href="/" className="text-2xl font-bold text-gray-900">
                                            Sofa<span className="text-amber-600">Lux</span>
                                        </Link>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="p-2 rounded-md hover:bg-gray-100">
                                            <FiX size={24} />
                                        </button>
                                    </div>

                                    <nav className="flex-1">
                                        <ul className="space-y-4">
                                            {navItems.map((item) => (
                                                <motion.li
                                                    key={item.path}
                                                    initial={{ x: 20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ duration: 0.3 }}>
                                                    <Link
                                                        href={item.path}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg ${pathname === item.path
                                                                ? 'bg-amber-50 text-amber-600'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                            }`}>
                                                        <span className="text-xl">{item.icon}</span>
                                                        {item.name}
                                                    </Link>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </nav>

                                    <div className="mt-auto pt-8 border-t border-gray-200">
                                        <div className="text-sm text-gray-500">
                                            <p>© {new Date().getFullYear()} SofaLux</p>
                                            <p className="mt-1">Premium furniture solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    )
}
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Navlink from './Navlink'

import { TiThMenu } from "react-icons/ti";
import { MdOutlineCloseFullscreen } from "react-icons/md";

export default function Navigation() {
    const [openMenu, setOpenMenu] = useState(false)
    const toggleNav = () => {
        setOpenMenu(!openMenu)
    }
    const closeNav = () => {
        setOpenMenu(false)
    }

    return (
        <>
            <header className='flex justify-between h-[3rem] md:border-b border-gray-800 rounded-b mb-10 bg-transparent p-12'>
                <nav className='w-full flex items-center p-1 justify-between pr-0'>
                    <Link href='/' className='p-2'>
                        <span className='text-[2rem]'>Sofa<strong className='text-amber-600'>Lux</strong></span>
                    </Link>
                    <button
                        onClick={toggleNav}
                        type='button'
                        className='inline-flex items-center p-2 w-10 h-10 justify-center md:hidden'
                        aria-controls='navbar-default'
                        aria-expanded={openMenu}>
                        {!openMenu ? <TiThMenu className='rounded-sm' size={32} /> : <MdOutlineCloseFullscreen className='rounded-sm' size={32} />}
                    </button>

                    <div className={`${openMenu ? 'fixed inset-0 flex flex-col items-center sm:border-r sm:rounded-sm sm:my-2 sm:border-amber-900 w-1/3 bg-gray-950 bg-opacity-75 z-100 transition-all duration-200' : 'hidden'}  md:flex md:flex-row md:outline-none md:items-center md:justify-between md:w-auto`}>
                        <ul className='flex flex-col font-montserrat p-8 pr-10 mt-6 md:flex-row md:space-x-12 sm:space-y-10 '>
                            <li onClick={closeNav} className="hover:translate-y-1 transform-all duration-300">
                                <Navlink href='/about'>About</Navlink>
                            </li>

                            <li className="group relative" onClick={closeNav}>
                                <Navlink href="/services" className="block py-2 px-4 hover:translate-y-1 transform-all duration-300">Services</Navlink>
                                <ul className="hidden group-hover:block mt-2 absolute top-full rounded-sm left-0 bg-gray-950 border border-gray-600 shadow-lg">
                                    <li>
                                        <Link href="" className="block py-2 px-4 hover:text-amber-600 hover:translate-y-1 transform-all duration-300 cursor-pointer">
                                            Revamp
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="" className="block py-2 px-4 hover:text-amber-600 hover:translate-y-1 transform-all duration-300 cursor-pointer">
                                            Sales
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="" className="block py-2 px-4 hover:text-amber-600 hover:translate-y-1 transform-all duration-300 cursor-pointer">
                                            Merch
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li onClick={closeNav} className="hover:translate-y-1 transform-all duration-300">
                                <Navlink href='/testimonials'>Testimonials</Navlink>
                            </li>
                            <li onClick={closeNav} className="hover:translate-y-1 transform-all duration-300">
                                <Navlink href='/contact'>Contact</Navlink>
                            </li>
                            <li onClick={closeNav} className="hover:translate-y-1 transform-all duration-300">
                                <Navlink href='/shop'>Shop</Navlink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

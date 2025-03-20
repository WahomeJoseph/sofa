'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdAdd } from "react-icons/io";
import { FaXTwitter } from 'react-icons/fa6'

export default function MemberCard({ member }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <>
            <section className="bg-transparent h-screen bg-red-700">
                    <div className="flex items-center bg-gray-950 rounded-lg shadow sm:flex border border-gray-800">
                        <Image
                            src={member.photo}
                            width={200}
                            height={50}
                            alt={member.name}
                            className="w-full h-[16rem] overflow-hidden rounded-lg sm:rounded-none sm:rounded-l-lg">
                        </Image>

                        <div className="p-5 relative flex flex-col justify-center w-full">
                            <h3 className="text-[1.5rem] font-bold tracking-tight text-[#ddd6cb]">
                                <span>{member.name}</span>
                            </h3>
                            <span className="text-amber-600 italic text-sm text-start">{member.role}</span>
                            <p className="my-3 font-light text-[#ddd6cb]">{member.bio}</p>

                            {/* show details */}
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="absolute -bottom-4 right-2 cursor-pointer bg-transparent text-amber-600 p-2 rounded-full hover:bg-amber-600 hover:text-gray-950 hover:rotate-[180deg] transition-all ease-in-out duration-300">
                                <IoMdAdd size={30} />
                            </button>

                            {/* content to be revealed */}
                            {showDetails && (
                                <div className='flex flex-col space-y-t'>
                                    <h2 className='text-[#ddd6cb] font-light'>{member.quote}</h2>
                                    <ul className="flex space-x-4 sm:mt-0">
                                        {/* <li>
                                            <Link href={member.socials.name} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                <FaXTwitter size={30} />
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
            </section>
        </>
    )
}

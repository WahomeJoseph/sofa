"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FaXTwitter, FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa6"
import { ChevronDown, Quote } from "lucide-react"

export default function MemberCard({ member }) {
    const [showDetails, setShowDetails] = useState(false)

    const socialIcons = {
        twitter: <FaXTwitter size={20} />,
        instagram: <FaInstagram size={20} />,
        pinterest: <FaPinterest size={20} />,
        facebook: <FaFacebook size={20} />,
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-gray-900/90 to-gray-950 rounded-2xl shadow-xl overflow-hidden border border-gray-800 hover:border-amber-600/30 group">
            <div className="flex flex-col md:flex-row">
                {/* Image container with overlay gradient */}
                <div className="relative w-full md:w-2/5 h-72 md:h-auto overflow-hidden">
                    <Image
                        src={member.photo || "/placeholder.svg"}
                        fill
                        alt={`${member.name}'s photo`}
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                        <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                        <span className="text-amber-400 font-medium">{member.role}</span>
                    </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-3/5 relative">
                    <div className="hidden md:block mb-4">
                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                        <span className="text-amber-400 font-medium">{member.role}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{member.bio}</p>

                    <div className="mt-6">
                        <motion.button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors duration-300 group/btn"
                            aria-expanded={showDetails}
                            aria-label={showDetails ? "Hide details" : "Show details"}>
                            <span>{showDetails ? "Hide details" : "Show more"}</span>
                            <motion.div
                                animate={{ rotate: showDetails ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-amber-500/10 rounded-full p-1">
                                <ChevronDown size={16} className="text-amber-500" />
                            </motion.div>
                        </motion.button>

                        {/* Expandable content */}
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden">
                                    <div className="pt-4 space-y-4">
                                        <div className="relative bg-gray-800/50 rounded-lg p-4 pl-10">
                                            <p className="text-gray-300 italic text-sm">{member.quote}</p>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-sm text-gray-400 mb-3">Connect with {member.name.split(" ")[0]}</p>
                                            <div className="flex gap-3">
                                                {member.socials.map((social, index) => (
                                                    <motion.div key={index} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                                                        <Link
                                                            href={social.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 hover:bg-amber-600 hover:text-white transition-all duration-300"
                                                            aria-label={`Follow ${member.name} on ${social.name}`}
                                                        >
                                                            {socialIcons[social.name.toLowerCase()] || (
                                                                <span className="text-sm">{social.name.charAt(0)}</span>
                                                            )}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

import { FaXTwitter, FaPinterestP, FaTiktok, FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

export default function Blog() {
    return (
        <div className="flex flex-row space-x-6 items-center">
            {/* Twitter */}
            <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-amber-600 text-blue-500 transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                    <FaXTwitter />
                </div>
                <span className="text-white font-bold text-sm mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Twitter</span>
            </div>
            {/* Instagram */}
            <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-amber-600 text-gradient bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                    <FaInstagram />
                </div>
                <span className="text-white font-bold text-sm mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Instagram</span>
            </div>
            {/* Pinterest */}
            <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-amber-600 text-red-600 transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                    <FaPinterestP />
                </div>
                <span className="text-white font-bold text-sm mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Pinterest</span>
            </div>
            {/* Facebook */}
            <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-amber-600 text-blue-800 transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                    <FaFacebookF />
                </div>
                <span className="text-white font-bold text-sm mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">Facebook</span>
            </div>
            {/* TikTok */}
            <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-amber-600 text-black transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                    <FaTiktok className="text-3xl bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] bg-clip-text text-transparent"/>
                </div>
                <span className="text-white font-bold text-sm mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">TikTok</span>
            </div>
        </div>
    )
}

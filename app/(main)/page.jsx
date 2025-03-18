import ImageSlider from "@/components/hero/ImageSlider";
import Link from "next/link";
import { FaXTwitter, FaPinterestP, FaTiktok, FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

export default function Home() {
  console.log('Welcome To Sofa Lux Utilities!')
  return (
    <>
      <header className="md:flex md:gap-12 sm:gap-4 sm:mx-auto sm:grid sm:grid-cols-1 sm:justify-center sm:items-center sm:p-2 sm:text-base mx-10 w-full max-w-[85rem] bg-transparent">
        <div className="md:w-[50rem] md:h-[34rem] my-6 sm:h-[26rem] sm:px-10">
          <ImageSlider />
        </div>

        {/* side details */}
        <aside className="w-full md:max-w-[44rem] p-2">
          <div>
            <h1 className="md:text-[2rem] sm:text-[1.5rem] p-1 rounded-sm font-bold font-sans-montserrat tracking-wide bg-transparent sm:truncate uppercase bg-gradient-to-r from-amber-800 to-amber-500" style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Discover the comfort and style your living room and office with our exclusive variety of sofas</h1>
            <p className="text-start text-base leading-relaxed p-1 sm:text-justify">Visit us and get your sofas of your choice. We also do sofa revamp covers & fabric changes</p>
          </div>
          <div className="flex gap-10 text-[1.5rem] sm:p-2 sm:mt-6 sm:justify-center sm:w-full">
            <Link href='/services' className="inline-block mt-3 md:p-3 sm:p-2 border border-gray-800 hover:border-amber-600 rounded-md text-[#ddd6cb] font-bold hover:text-amber-600 first:bg-transparent first:text-[#ff9b05]">Our Services</Link>
            <Link href='/pricing' className="inline-block mt-3 md:p-3 sm:p-2 border border-gray-800 hover:border-amber-600 rounded-md text-[#ddd6cb] font-bold hover:text-amber-600">Get Started</Link>
          </div>

          {/* socials */}
          <div className="flex flex-row mt-14 m-auto space-x-8 justify-center items-center">
            <Link href='https://x.com/WachiraJoseph17'>
              <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-gray-900 text-[#ddd6cb] transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                  <FaXTwitter size={20} />
                </div>
                <span className="text-[#ddd6cb] font-bold text-sm mt-2 opacity-1 transition-opacity duration-300 group-hover:opacity-100">Twitter</span>
              </div>
            </Link>

            <Link href='https://x.com/WachiraJoseph17'>
              <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-amber-600 text-gradient bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                  <FaInstagram size={20} />
                </div>
                <span className="text-[#ddd6cb] font-bold text-sm mt-2 opacity-1 transition-opacity duration-300 group-hover:opacity-100">Instagram</span>
              </div>
            </Link>

            <Link href='https://x.com/WachiraJoseph17'>
              <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-red-700 text-[#ddd6cb] transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                  <FaPinterestP size={20} />
                </div>
                <span className="text-[#ddd6cb] font-bold text-sm mt-2 opacity-1 transition-opacity duration-300 group-hover:opacity-100">Pinterest</span>
              </div>
            </Link>

            <Link href='https://x.com/WachiraJoseph17'>
              <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-blue-600 text-[#ddd6cb] transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                  <FaFacebookF size={20} />
                </div>
                <span className="text-[#ddd6cb] font-bold text-sm mt-2 opacity-1 transition-opacity duration-300 group-hover:opacity-100">Facebook</span>
              </div>
            </Link>

            <Link href='https://x.com/WachiraJoseph17'>
              <div className="flex flex-col items-center group">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-white transition-transform duration-300 group-hover:scale-75 group-hover:origin-top">
                  <FaTiktok size={20} />
                </div>
                <span className="text-[#ddd6cb] font-bold text-sm mt-2 opacity-1 transition-opacity duration-300 group-hover:opacity-100">Tiktok</span>
              </div>
            </Link>
          </div>
        </aside>
      </header>
    </>
  );
}

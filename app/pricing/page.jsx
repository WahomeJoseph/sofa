import { FaXTwitter, FaPhone, FaPinterestP, FaTiktok, FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

export async function generateMetadata() {
  return {
      title: 'Sofa Lux Pricing and Offers',
      description: "Elevate Your Living Room and Offices with Quality Sofas.",
  }
}

export default function Pricing() {
  return (
    <>
      <div className="bg-transparent">
        <div className="md:m-auto md:px-6 md:py-6 sm:p-10 sm:mx-10 md:px-8 lg:px-20">
          <div className="mx-auto tracking-wide text-center lg:w-10/12 xl:w-7/12">
            <h2 className="text-[2rem] p-1 rounded-sm font-bold font-sans-montserrat tracking-wide bg-transparent uppercase bg-gradient-to-r from-amber-900 to-amber-500" style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Explore our Exclusive Sofa Collection Pricing and Plan</h2>
          </div>

          <div className="mt-10 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-8 xl:w-10/12">
            {/* side bar */}
            <div className="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
              <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl bg-gray-950 border border-gray-600 shadow-lg transition duration-500 group-hover:scale-105 lg:group-hover:scale-105"></div>
              <div className="relative p-6 space-y-6 lg:p-8">
                <h3 className="text-3xl text-amber-600 font-bold text-center">Luxury Sofas</h3>

                <div>
                  <div className="relative flex justify-around">
                    <div className="flex items-end">
                      <span className="text-[7rem] text-gray-800 font-bold leading-0">25</span>
                      <div className="pb-1">
                        <span className="block text-2xl text-gray-700 font-bold">%</span>
                        <span className="block text-xl text-amber-600 font-bold">Off</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul role="list" className="w-max space-y-4 py-6 m-auto text-gray-600">
                  <li className="space-x-3">
                    <span className="text-amber-600 font-semibold">&#10003;</span>
                    <span>Premium Fabric and Leather</span>
                  </li>
                  <li className="space-x-3">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>Customizable Designs</span>
                  </li>
                  <li className="space-x-3">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>Free Delivery and Assembly</span>
                  </li>
                  <li className="space-x-3">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>On-site Sofa Revamping</span>
                  </li>
                </ul>
                <p className="flex items-center justify-center space-x-4 text-lg text-gray-600 text-center">
                  <span>Call us:</span>
                  <a href="tel:+254795969757" className="flex space-x-2 items-center text-amber-600">
                  <FaPhone /><span className="font-bold">+2547 959 69 757</span>
                  </a>
                </p>
                <button type="submit" title="Submit" className="block w-full py-3 px-6 text-center rounded-md transition bg-amber-700 border border-gray-600 active:bg-purple-800 focus:bg-indigo-600">
                  <a href="mailto:josephwachira589@gmail.com">
                    <span className="text-[#ddd6cb] text-xl font-bold">
                      Reach Us Out
                    </span>
                  </a>
                </button>
              </div>
            </div>

            {/* 2nd side card */}
            <div className="relative group md:w-6/12 lg:w-7/12">
              <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl bg-gray-950 border border-gray-600 shadow-lg transition duration-500 group-hover:scale-105"></div>
              <div className="relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16">
                <ul role="list" className="space-y-4 py-6 text-gray-600">
                  <li className="space-x-2">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>Exclusive Sofa Designs</span>
                  </li>
                  <li className="space-x-2">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>High-Quality Materials</span>
                  </li>
                  <li className="space-x-2">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>Expert Craftsmanship</span>
                  </li>
                  <li className="space-x-2">
                    <span className="text-amber-600 font-bold">&#10003;</span>
                    <span>Custom Revamp Services</span>
                  </li>
                </ul>
                <p className="text-gray-600">Transform your home or office with our luxurious sofas. Check out our socials</p>
                {/* <div className="mt-6 flex justify-between items-center mx-auto p-2 bg-red-600"> */}

                  <ul className="flex justify-between mx-10 space-x-4 p-4 rounded-sm mt-10">
                  <li>
                      <a href="#" className="text-[#ddd6cb] hover:shadow-[0px_20px_207px_10px_rgba(20,_30,_203,_0.88)]">
                        <FaXTwitter size={30}/>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-[#ddd6cb] hover:shadow-[0px_20px_207px_10px_rgba(20,_30,_203,_0.88)]">
                        <FaInstagram size={30}/>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-[#ddd6cb] hover:shadow-[0px_20px_207px_10px_rgba(20,_30,_203,_0.88)]">
                        <FaPinterestP size={30}/>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-[#ddd6cb] hover:shadow-[0px_20px_207px_10px_rgba(20,_30,_203,_0.88)]">
                        <FaFacebookF size={30}/>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-[#ddd6cb] hover:shadow-[0px_20px_207px_10px_rgba(20,_30,_203,_0.88)]">
                        <FaTiktok size={30}/>
                      </a>
                    </li>
                  </ul>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

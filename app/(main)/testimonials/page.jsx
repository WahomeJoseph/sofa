'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { FaStar } from "react-icons/fa6"
import { RiDoubleQuotesL } from "react-icons/ri";

// export async function generateMetadata() {
//   return {
//       title: 'Esteemed Sofa Lux Customers',
//       description: "Elevate Your Living Room and Offices with Quality Sofas.",
//   }
// }

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1522390108011-5f8667fd551d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D',
    reviewIcon: <RiDoubleQuotesL size={42} className="text-amber-600" />,
    reviewAlt: 'Quotes',
    details: "From start to finish, my experience with this company was exceptional. The customer service team was responsive, helpful, and knowledgeable. They made the entire process of selecting and purchasing a sofa incredibly smooth and enjoyable.",
    name: 'Merry Jane',
    address: 'Juja, Thika'
  },
  {
    image: 'https://images.unsplash.com/photo-1522390108011-5f8667fd551d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D',
    reviewIcon: <RiDoubleQuotesL size={42} className="text-amber-600" />,
    reviewAlt: 'Quotes',
    details: "The sofa I bought from this website has completely transformed my living room. The design is sleek and modern, yet timeless. It complements my decor perfectly, and I've received countless compliments from friends and family.",
    name: 'Merry Jane',
    address: 'Juja, Thika'
  },
  {
    image: 'https://images.unsplash.com/photo-1522390108011-5f8667fd551d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D',
    reviewIcon: <RiDoubleQuotesL size={42} className="text-amber-600" />,
    reviewAlt: 'Quotes',
    details: "What I loved most about shopping here was the ability to customize my sofa to match my exact preferences. From choosing the fabric to selecting the cushion firmness, every detail was tailored to my liking. The result is a sofa that feels uniquely mine.",
    name: 'Merry Jane',
    address: 'Juja, Thika'
  },
  {
    image: 'https://images.unsplash.com/photo-1522390108011-5f8667fd551d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D',
    reviewIcon: <RiDoubleQuotesL size={42} className="text-amber-600" />,
    reviewAlt: 'Quotes',
    details: "I've had my new sofa for a few weeks now and it's beyond comfortable! The quality of the materials is evident in every stitch. It has truly become the centerpiece of my living room, and I couldn't be happier with my purchase.",
    name: 'Merry Jane',
    address: 'Juja, Thika'
  },
  {
    image: 'https://images.unsplash.com/photo-1522390108011-5f8667fd551d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsYWNrJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D',
    reviewIcon: <RiDoubleQuotesL size={42} className="text-amber-600" />,
    reviewAlt: 'Quotes',
    details: "I was looking for a durable sofa that could withstand daily use and still look great. This sofa has exceeded my expectations. It's sturdy, well-made, and holds up beautifully even with kids and pets jumping on it.",
    name: 'Merry Jane',
    address: 'Juja, Thika'
  }
]

const Testimonial = () => {
  const sliderRef = useRef(null)
  // const [currentSlider, setCurrentSlider] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlider((prevIndex) =>
  //       prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0
  //     )
  //     if (sliderRef.current) {
  //       sliderRef.current.swiper.slideTo(currentSlider)
  //     }
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [currentSlider])

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  return (
    <>
      <section className='pt-6 dark:bg-dark'>
        <h2 className="text-[2rem] p-1 flex justify-center text-amber-600 mb-12 rounded-sm font-bold font-sans-montserrat tracking-wide">Our Customer Reviews</h2>
        <div className='container mx-auto mb-20 relative'>
          <Swiper
            slidesPerView={1}
            ref={sliderRef}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="transition-all duration-500 ease-in-out">
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <SingleTestimonial {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* slider navigation buttons */}
          <div className='absolute left-0 right-0 z-10 flex items-center justify-center gap-10 sm:bottom-0'>
            <div className='prev-arrow cursor-pointer' onClick={handlePrev}>
              <button className='d flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#ddd6cb] bg-transparent text-dark transition-all hover:border-gray-600 cursor-pointer hover:drop-shadow-testimonial dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:drop-shadow-none'>
                <GrPrevious size={30} className='text-amber-600' />
              </button>
            </div>
            <div className='next-arrow cursor-pointer' onClick={handleNext}>
              <button className='d flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#ddd6cb] bg-transparent text-dark transition-all hover:border-gray-600 cursor-pointer hover:drop-shadow-testimonial dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:drop-shadow-none'>
                <GrNext size={30} className='text-amber-600' />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonial

const SingleTestimonial = ({ image, reviewIcon, details, name, address }) => {
  return (
    <div className='relative flex justify-center'>
      <div className='relative w-full pb-12 md:w-11/12 lg:w-11/12 xl:w-4/5'>
        <div className='w-full items-center md:flex'>
          {/* img */}
          <div className='relative mb-4 w-full md:max-w-[85rem] sm:mx-10 md:mb-0 md:mr-14 lg:mr-14 lg:max-w-[300px]'>
            <Image src={image} width={100} height={100} priority alt='testimonial' className="md:w-full transition-all duration-500 ease-in-out sm:sr-only md:not-sr-only rounded-sm transform scale-95 hover:scale-100" />
            <span className='absolute -left-6 -top-7 z-[-1] hidden sm:block'>
              <DotShape />
            </span>
            {/* bottom circle */}
            <span className='absolute -bottom-6 -right-6 z-[-1]'>
              <svg
                width='64'
                height='64'
                viewBox='0 0 64 64'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 32C3 15.9837 15.9837 3 32 3C48.0163 2.99999 61 15.9837 61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32Z'
                  stroke='#3056D3'
                  strokeWidth='6'
                />
              </svg>
            </span>
          </div>

          {/* test side info */}
          <div className='w-full bg-gray-950 border border-gray-800 sm:mt-10 sm:mb-10 p-3 space-y-2 rounded-sm'>
            <div>
              <div className='mb-3'>
                {reviewIcon}
              </div>

              <p className='text-[1.2rem] mb-4 text-justify leading text-[#ddd6cb] dark:text-dark-6'>
                {details}
              </p>

              <span className='text-[1.2rem] font-semi-bold leading text-[#ddd6cb]'>
                {name}
              </span>

              <div className='flex justify-between'>
                <span className='text-base text-gray-600 dark:text-dark-6'>
                  {address}
                </span>
                <ul className='flex flex-row text-amber-600 space-x-1 pr-10'>
                  {[...Array(5)].map((_, i) => (
                    <li key={i}><FaStar /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// dot shapes
const DotShape = () => {
  const circles = [
    { cx: 1.66, cy: 74.52 }, { cx: 1.66, cy: 30.94 },
    { cx: 16.30, cy: 74.52 }, { cx: 16.30, cy: 30.94 },
    { cx: 30.94, cy: 74.52 }, { cx: 30.94, cy: 30.94 },
    { cx: 45.58, cy: 74.52 }, { cx: 45.58, cy: 30.94 },
    { cx: 60.22, cy: 74.52 }, { cx: 74.66, cy: 74.52 },
    { cx: 60.22, cy: 30.94 }, { cx: 74.66, cy: 30.94 },
    { cx: 1.66, cy: 59.88 }, { cx: 1.66, cy: 16.30 },
    { cx: 16.30, cy: 59.88 }, { cx: 16.30, cy: 16.30 },
    { cx: 30.94, cy: 59.88 }, { cx: 30.94, cy: 16.30 },
    { cx: 45.58, cy: 59.88 }, { cx: 45.58, cy: 16.30 },
    { cx: 60.22, cy: 59.88 }, { cx: 74.66, cy: 59.88 },
    { cx: 60.22, cy: 16.30 }, { cx: 74.66, cy: 16.30 },
    { cx: 1.66, cy: 45.25 }, { cx: 1.66, cy: 1.66 },
    { cx: 16.30, cy: 45.25 }, { cx: 16.30, cy: 1.66 },
    { cx: 30.94, cy: 45.25 }, { cx: 30.94, cy: 1.66 },
    { cx: 45.58, cy: 45.25 }, { cx: 45.58, cy: 1.66 },
    { cx: 60.22, cy: 45.25 }, { cx: 74.66, cy: 45.25 },
    { cx: 60.22, cy: 1.66 }, { cx: 74.66, cy: 1.66 }
  ]

  return (
    <svg width='77' height='77' viewBox='0 0 77 77' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {circles.map((circle, index) => (
        <circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r='1.66'
          transform={`rotate(-90 ${circle.cx} ${circle.cy})`}
          fill='#d97706'
        />
      ))}
    </svg>
  )
}

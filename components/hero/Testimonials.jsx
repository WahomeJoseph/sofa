"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { BiSolidQuoteAltRight } from "react-icons/bi";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80",
    details:
      "From start to finish, my experience with SofaLux was exceptional. The customer service team was responsive, helpful, and knowledgeable. They made the entire process of selecting and purchasing a sofa incredibly smooth and enjoyable.",
    name: "Sarah Johnson",
    address: "Nairobi, Kenya",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    details:
      "The sofa I bought from SofaLux has completely transformed my living room. The design is sleek and modern, yet timeless. It complements my decor perfectly, and I've received countless compliments from friends and family.",
    name: "Michael Odhiambo",
    address: "Mombasa, Kenya",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    details:
      "What I loved most about shopping at SofaLux was the ability to customize my sofa to match my exact preferences. From choosing the fabric to selecting the cushion firmness, every detail was tailored to my liking. The result is a sofa that feels uniquely mine.",
    name: "Amina Wanjiku",
    address: "Kisumu, Kenya",
    rating: 4,
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    details:
      "I've had my new sofa for a few weeks now and it's beyond comfortable! The quality of the materials is evident in every stitch. It has truly become the centerpiece of my living room, and I couldn't be happier with my purchase.",
    name: "Grace Muthoni",
    address: "Nakuru, Kenya",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    details:
      "I was looking for a durable sofa that could withstand daily use and still look great. This sofa has exceeded my expectations. It's sturdy, well-made, and holds up beautifully even with kids and pets jumping on it.",
    name: "David Kamau",
    address: "Eldoret, Kenya",
    rating: 5,
  },
]

const Testimonials = () => {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
  }

  return (
    <section className="py-0 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16">
          <h2 className="text-[2rem] font-bold text-amber-500 mb-4">What Our Customers Say</h2>
          <div className="h-1 w-20 bg-amber-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our satisfied customers have to say about their SofaLux
            experience.
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass:
                "inline-block w-3 h-3 rounded-full bg-gray-600 mx-1 cursor-pointer transition-all duration-300",
              bulletActiveClass: "!bg-amber-500 w-5",
            }}
            onSlideChange={handleSlideChange}
            modules={[Autoplay, Pagination, Navigation]}
            className="testimonial-swiper">
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} isActive={activeIndex === index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-8 -mt-6 pointer-events-none">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="testimonial-prev-btn flex items-center justify-center w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm text-white border border-gray-700 shadow-lg hover:bg-amber-600 transition-all duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="testimonial-next-btn flex items-center justify-center w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm text-white border border-gray-700 shadow-lg hover:bg-amber-600 transition-all duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-gray-900/60 to-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-amber-600 shadow-lg mb-4">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={`${testimonial.name}'s profile picture`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-1 text-center">{testimonial.name}</h3>
          <p className="text-gray-400 text-sm mb-3 text-center">{testimonial.address}</p>
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-600"} mr-1`}
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col justify-center">
          <div className="relative">
            <BiSolidQuoteAltRight size={40} className="absolute -top-3 -left-2 text-amber-600/70 rotate-180" />
            <p className="text-gray-200 text-base font-light leading-relaxed italic pl-6 md:pl-8 relative z-10">
              {testimonial.details}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Testimonials

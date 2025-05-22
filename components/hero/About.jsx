'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import green from '@/assets/green-sofa.jpg'
import classic from '@/assets/classic.jpg'
import gatewood from '@/assets/gatewood.jpg'
import gray from '@/assets/gray-sofa.jpg'
import Teams from '../team/Teams'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const stats = [
    { value: '1000+', label: 'Happy Customers'},
    { value: '630+', label: 'Completed Projects'},
    { value: '1000+', label: 'Successful Orders'},
    { value: '4.2', label: 'Customer Rating'},
  ]

  return (
    <section ref={sectionRef} className='py-6 flex flex-col space-y-12 min-h-screen'>
      {/* Heading with animated underline */}
      <div className='text-center space-y-4'>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className='text-4xl md:text-5xl font-bold tracking-tight text-amber-500'>
          About SofaLux
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '80px' } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='h-1 bg-amber-600 mx-auto rounded-full'/>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='max-w-2xl mx-auto text-gray-400 text-lg'>
          Transforming spaces with luxury and comfort since 2010
        </motion.p>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 lg:gap-16'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='flex flex-col space-y-10'>
          {/* Description Card */}
          <motion.article
            whileHover={{ scale: 1.02 }}
            className='p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800'>
            <p className='text-gray-200 text-base font-light leading-relaxed'>
              Upgrade your home or office with our luxurious and functional sofas. We also revamp existing furniture
              with fabric changes to match your unique taste and style. Transform your space with our premium services
              and experience the perfect blend of comfort and elegance.
            </p>
          </motion.article>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='grid grid-cols-2 gap-4'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(217, 119, 6, 0.1)',
                  borderColor: 'rgba(217, 119, 6, 0.5)',
                }}
                className='flex flex-col items-center justify-center p-6 bg-gray-900/30 rounded-xl border border-gray-800 transition-all duration-300'>
                {/* <span className='text-2xl mb-2'>{stat.icon}</span> */}
                <h3 className='text-2xl md:text-3xl font-bold text-amber-500 mb-1'>{stat.value}</h3>
                <span className='text-sm text-gray-400 text-center'>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='flex justify-center md:justify-start'>
            <Link href='/pricing'>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className='group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-lg font-medium shadow-lg shadow-amber-900/20 transition-all duration-300'>
                Get Started
                <ArrowRight size={16} className='transition-transform duration-300 group-hover:translate-x-1' />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Grid */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='grid grid-cols-2 gap-4 md:gap-6'>
          {[
            { img: green, name: 'Modern Green' },
            { img: classic, name: 'Classic Elegance' },
            { img: gatewood, name: 'Gatewood Collection' },
            { img: gray, name: 'Contemporary Gray' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
                zIndex: 10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              }}
              className='relative group rounded-xl overflow-hidden'>
              <div className='relative w-full h-48 md:h-64 lg:h-72 overflow-hidden'>
                <Image
                  src={item.img || '/placeholder.svg'}
                  layout='fill'
                  objectFit='cover'
                  alt={`${item.name} sofa`}
                  className='transition-all duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                  <h4 className='text-white font-medium text-sm md:text-base'>{item.name}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>

      {/* Teams Component */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.5 }}>
        <Teams />
      </motion.div>
    </section>
  )
}

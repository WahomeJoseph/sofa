"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import MemberCard from "./MemberCard"
import bonnie from "@/assets/bonnie-green.png"
import { Users } from "lucide-react"

export default function Team() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Sample team data - in a real app, you'd want to diversify this
  const team = [
    {
      id: 1,
      name: "Merry Jane",
      role: "Chief Executive Officer",
      photo: bonnie,
      bio: "Janey drives the vision and strategy of Sofa Lux, ensuring we deliver premium furniture solutions.",
      quote: "I believe that every home deserves a touch of luxury. At Sofa Lux, we make that possible.",
      socials: [
        {
          name: "twitter",
          url: "https://twitter.com/WachiraJoseph17",
        },
        {
          name: "instagram",
          url: "https://instagram.com/WachiraJoseph17",
        },
        {
          name: "pinterest",
          url: "https://pinterest.com/WachiraJoseph17",
        },
        {
          name: "facebook",
          url: "https://facebook.com/WachiraJoseph17",
        },
      ],
    },
    {
      id: 2,
      name: "David Kamau",
      role: "Design Director",
      photo: bonnie,
      bio: "David leads our design team, bringing innovative and elegant furniture designs to life.",
      quote: "Great design is not just about aesthetics, but about creating pieces that enhance people's lives.",
      socials: [
        {
          name: "twitter",
          url: "https://twitter.com/WachiraJoseph17",
        },
        {
          name: "instagram",
          url: "https://instagram.com/WachiraJoseph17",
        },
        {
          name: "pinterest",
          url: "https://pinterest.com/WachiraJoseph17",
        },
        {
          name: "facebook",
          url: "https://facebook.com/WachiraJoseph17",
        },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-amber-600/30 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-amber-600/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16">

          <h2 className="text-[2rem] font-bold text-amber-600 mb-4">Meet the Visionaries Behind SofaLux</h2>
          <div className="h-1 w-20 bg-amber-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300 text-base font-light">
            Our talented team combines expertise in design, craftsmanship, and customer service to deliver exceptional
            furniture solutions that transform your living spaces.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {team.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center">
        </motion.div>
      </div>
    </section>
  )
}

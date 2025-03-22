"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Users, Star, ShoppingBag, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// Animation component for counting up numbers
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      // Easing function for a more natural animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Stat item component
const StatItem = ({
  icon,
  value,
  label,
  suffix = "+",
  prefix = "",
  delay = 0,
}: {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  prefix?: string
  delay?: number
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="flex flex-col items-center text-center p-6 transform transition-all duration-300 hover:scale-105">
      <div className="mb-4 p-5 rounded-full bg-[#EAE7DD] text-[#99775C] shadow-lg">{icon}</div>
      <h3 className="text-5xl font-extrabold mb-2 text-[#99775C]">
        {isVisible ? (
          <AnimatedCounter end={value} suffix={suffix} prefix={prefix} />
        ) : (
          <span className="opacity-0">
            {value}
            {suffix}
          </span>
        )}
      </h3>
      <p className="text-lg font-medium text-[#99775C]/80">{label}</p>
    </div>
  )
}

const reviews = [
  {
    id: 1,
    text: "Apartment was just as described but most importantly the team was so helpful prior to and during our stay. They helped with local tips, hard to get tickets, and apartment questions. Highly recommend.",
    author: "Carrie",
    location: "AVENUE VICTOR HUGO II, PARIS",
    date: "JANUARY 2025",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    text: "Beautiful apartment in the heart of Paris. The views were spectacular and the amenities were perfect. The team went above and beyond to make our stay memorable.",
    author: "Sophie",
    location: "RUE DE RIVOLI, PARIS",
    date: "DECEMBER 2024",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    text: "An absolutely stunning property with impeccable service. Every detail was considered and the location couldn't have been better. We'll definitely be back!",
    author: "James",
    location: "SAINT-GERMAIN-DES-PRÉS, PARIS",
    date: "FEBRUARY 2025",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1920&auto=format&fit=crop",
  },
]

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1))
  }

  const previousReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? reviews.length - 1 : prevIndex - 1))
  }

  return (
    <div className="w-full bg-[#EAE7DD] w-full">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto px-5 py-16 md:py-5"
      >
        <motion.h2 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-light font-inter text-center text-[#99775C] mb-16"
        >
          <span className="text-[#99775C] font-normal">Trusted</span> by our Guests
        </motion.h2>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative bg-white border border-[#99775C]/10 rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              <StatItem
                icon={<Users className="h-8 w-8" />}
                value={10}
                label="Trusted Customers"
                suffix="k+"
                delay={0}
              />
              <StatItem 
                icon={<Star className="h-8 w-8" />} 
                value={25} 
                label="5-Star Reviews" 
                suffix="k+" 
                delay={200} 
              />
              <StatItem
                icon={<ShoppingBag className="h-8 w-8" />}
                value={99}
                label="Orders Completed"
                suffix="%"
                delay={400}
              />
              <StatItem
                icon={<Award className="h-8 w-8" />}
                value={8}
                label="Years of Excellence"
                suffix="+"
                delay={600}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="flex flex-col justify-between h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.p 
                  className="text-xl md:text-2xl leading-relaxed font-normal mb-6 text-[#99775C]"
                >
                  {reviews[currentIndex].text}
                </motion.p>
                <div className="flex flex-col mb-4">
                  <motion.p 
                    className="text-2xl text-[#99775C] mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {reviews[currentIndex].author}
                  </motion.p>
                  <motion.p 
                    className="text-sm tracking-wider text-[#99775C]/80 mb-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {reviews[currentIndex].location}, {reviews[currentIndex].date}
                  </motion.p>
                  
                  <div className="flex gap-4">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={previousReview}
                        className="rounded-full h-12 w-12 bg-[#99775C] hover:bg-[#886a52] text-[#EAE7DD]"
                      >
                        <ChevronLeft className="h-6 w-6" />
                        <span className="sr-only">Previous review</span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextReview}
                        className="rounded-full h-12 w-12 bg-[#99775C] hover:bg-[#886a52] text-[#EAE7DD]"
                      >
                        <ChevronRight className="h-6 w-6" />
                        <span className="sr-only">Next review</span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
            >
              <Image
                src={reviews[currentIndex].image || "/placeholder.svg"}
                alt={`Review by ${reviews[currentIndex].author}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
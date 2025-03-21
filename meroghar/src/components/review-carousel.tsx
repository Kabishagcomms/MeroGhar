"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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
    <div className="w-full bg-secondaryColor w-full">
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
          className="text-4xl md:text-5xl font-light font-inter text-center text-mainColor mb-16"
        >
          <span className="text-mainColor font-normal">Trusted</span> by our Guests
        </motion.h2>

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
                  className="text-xl md:text-2xl leading-relaxed font-normal mb-6 text-mainColor"
                >
                  {reviews[currentIndex].text}
                </motion.p>
                <div className="flex flex-col mb-4">
                  <motion.p 
                    className="text-2xl text-mainColor mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {reviews[currentIndex].author}
                  </motion.p>
                  <motion.p 
                    className="text-sm tracking-wider text-mainColor/80 mb-24"
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
                        className="rounded-full h-12 w-12 bg-mainColor hover:bg-mainColor/90 text-secondaryColor"
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
                        className="rounded-full h-12 w-12 bg-mainColor hover:bg-mainColor/90 text-secondaryColor"
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
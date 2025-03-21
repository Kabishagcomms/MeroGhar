"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Property, wishlist } from '../interface/response'
import { SessionUser } from '../api/server/auth'
import Card from './card/card'
import { motion } from 'framer-motion'

interface CarouselProps {
  properties: Partial<Property>[]
  userData: SessionUser
  wishList?: wishlist
}

export default function PropertyCarousel({ properties, userData, wishList }: CarouselProps) {

  console.log(properties)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer for rounding errors
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition)
      // Initial check
      checkScrollPosition()

      // Check on window resize
      window.addEventListener("resize", checkScrollPosition)

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition)
        window.removeEventListener("resize", checkScrollPosition)
      }
    }
  }, [])

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mx-auto w-full max-w-[1400px] px-4 py-12"
    >
      <div className="text-center mb-10">
        <motion.h2 
          variants={headerVariants}
          className="text-4xl md:text-5xl font-inter text-secondaryColor mb-6"
        >
          Step inside and <span className=" font-semibold text-secondaryColor font-inter">be swept away</span>
        </motion.h2>
        <motion.p 
          variants={paragraphVariants}
          className="max-w-3xl mx-auto text-center text-secondaryColor text-gray-700 font-rubik text-normal font-medium tracking-wide leading-6"
        >
          We are only satisfied with the best. From unbeatable locations to astonishing interior design, we consider
          every detail when it comes to selecting our luxury vacation rentals. Take your pick from our collection of
          spacious luxury apartment rentals, luxury villas or luxury home rentals, all ideally located, exquisitely
          designed and lavishly furnished.
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 z-30 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full bg-white/90 shadow-md border-none h-12 w-12",
                !canScrollLeft && "opacity-0 pointer-events-none"
              )}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </Button>
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory px-12"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx global>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            [class*="overflow-x-auto"]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {properties.map((property, index) => {
            const inwish = wishList?.wishList.some(
              (data) => data._id == property._id
            ) || false
            
            return (
              <motion.div 
                variants={cardVariants}
                key={index} 
                className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-start"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  use="card"
                  key={index}
                  wish={inwish}
                  data={property}
                  user={
                    (userData.is_Admin && 'admin') ||
                    (userData.docId == property.userId && 'owner') ||
                    (userData.docId == '' && '') ||
                    'user'
                  }
                />
              </motion.div>
            )
          })}
        </motion.div>

        <div className="absolute right-0 top-0 bottom-0 z-30 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full bg-white/90 shadow-md border-none h-12 w-12",
                !canScrollRight && "opacity-0 pointer-events-none"
              )}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </Button>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
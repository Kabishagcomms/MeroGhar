'use client'

import Footer from '@/components/footer'
import { SessionUser } from '../../../api/server/auth'

import { Property, wishlist } from '../../../interface/response'
import HeroSection from '@/components/HeroSection'
import NewsletterSignup from '@/components/newsletter-signup'
import PropertyCarousel from '@/components/property-carousel'
import ReviewCarousel from '@/components/review-carousel'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface HomeProps {
  properties: Partial<Property>[]
  wishList?: wishlist
  userData: SessionUser
}

export function HomeClient({ properties, wishList, userData }: HomeProps) {
  const router = useRouter()

  useEffect(() => {
    return router.refresh()
  }, [])

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto w-[95%] flex-1"
      >
        {properties.length == 0 && (
          <motion.h1 
            variants={fadeInUp}
            className="my-5 text-center text-lg font-semibold md:text-xl"
          >
            No Properties To Display!
          </motion.h1>
        )}

        <motion.div
          variants={fadeInUp}
        >
          <PropertyCarousel properties={properties} userData={userData} wishList={wishList} />
        </motion.div>

        {properties.length >= 8 && (
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto rounded-lg border border-white bg-themeColor px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-mainColor"
          >
            LoadMore
          </motion.button>
        )}
      </motion.div>

      <ReviewCarousel/>
      <NewsletterSignup/>
      <Footer/>
    </motion.main>
  )
}

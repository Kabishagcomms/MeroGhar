import React from 'react'
import Search from './navbar/searchButton'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'


const HeroSection = () => {

  const t = useTranslations('hero')
  return (
    <div className="relative h-[100vh] w-full">
      {/* Background Video */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dnimr7n8t/video/upload/v1741926894/3015510-hd_1920_1080_24fps_rbj4yh.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {/* Hero Text */}
          <div className="text-center">
            <h1 className="mb-6 font-rubik text-5xl font-medium text-mainColor sm:text-7xl">
              {t('title')}
              <motion.span
                className="text-mainColor font-semibold"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [0.98, 1.02, 0.98],
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.3)",
                    "0 0 15px rgba(255,255,255,0.5)",
                    "0 0 5px rgba(255,255,255,0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                {t('ssTitle')}
              </motion.span>
            </h1>
            <p className="text-xl text-mainColor/90 sm:text-2xl font-light tracking-wide">
              {t('subtitle')}
            </p>
          </div>

          {/* Search Container */}
          <div className="w-full max-w-3xl">
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

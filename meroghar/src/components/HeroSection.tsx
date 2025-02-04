import React from 'react'
import Search from './navbar/searchButton'

const HeroSection = () => {
  return (
    <div className="relative h-[500px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070&auto=format&fit=crop')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {/* Hero Text */}
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              Find your perfect stay on Mero Ghar
            </h1>
            <p className="text-lg text-white/90 sm:text-xl">
              Explore a wide range of accommodations for your next trip!
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

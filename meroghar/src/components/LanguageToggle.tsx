'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const router = useRouter()
  const cookies = new Cookies()
  const [currentLocale, setCurrentLocale] = useState<string>('en')
  
  // Language display labels
  const localeLabels = {
    en: 'EN',
    ne: 'NE'
  }

  useEffect(() => {
    // Get the current locale from cookies or default to 'en'
    const savedLocale = cookies.get('NEXT_LOCALE') || 'en'
    setCurrentLocale(savedLocale)
  }, [])

  const toggleLanguage = () => {
    // Toggle between 'en' and 'ne'
    const newLocale = currentLocale === 'en' ? 'ne' : 'en'
    
    // Save the new locale in a cookie
    cookies.set('NEXT_LOCALE', newLocale, { path: '/' })
    setCurrentLocale(newLocale)
    
    // Add a small delay before navigation to allow the animation to complete
    setTimeout(() => {
      // Use window.location for a full page refresh with the new locale
      const currentPath = window.location.pathname
      const pathWithoutLocale = currentPath.replace(/^\/(en|ne)/, '')
      window.location.href = `/${newLocale}${pathWithoutLocale || '/Home'}`
    }, 300) // Match this with the transition duration
  }

  return (
    <div className={`relative inline-flex rounded-full border border-[#99775C]/30 ${className}`}>
      <div 
        className={`absolute top-0 bottom-0 ${
          currentLocale === 'en' ? 'right-0' : 'left-0'
        } w-1/2 bg-[#99775C] rounded-full transition-transform ease-in-out duration-300`}
        style={{ 
          transform: `translateX(${currentLocale === 'en' ? '0%' : '0%'})` 
        }}
      />
      <button
        onClick={() => currentLocale === 'en' ? toggleLanguage() : null}
        className={`relative z-10 px-4 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
          currentLocale === 'ne' ? 'text-white' : 'text-[#99775C]'
        }`}
      >
        {localeLabels.ne}
      </button>
      <button
        onClick={() => currentLocale === 'ne' ? toggleLanguage() : null}
        className={`relative z-10 px-4 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
          currentLocale === 'en' ? 'text-white' : 'text-[#99775C]'
        }`}
      >
        {localeLabels.en}
      </button>
    </div>
  )
}
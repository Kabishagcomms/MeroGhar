'use client'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useRef } from 'react'
import InititailModalC from './navmodel'
import { createRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Search from './searchButton'
import Image from 'next/image'
import { motion } from 'framer-motion'
import NotificationDropdown from "@/components/notifications/notification-dropdown"

interface NavProps {
  theme: string
  authState: boolean
  img: string
  is_Admin: boolean
}

const NavBar = ({ authState, img, is_Admin }: NavProps): JSX.Element => {

  const t = useTranslations('common')
  //get auth state and pass into the initial model
  const [open, setopen] = useState(false)
  const menuRef = createRef<HTMLDivElement>()
  const router = useRouter()

  useEffect(() => {
    const clickHandler = (e: any) => {
      //if event click is outsise the div ref of the modal clsoe modal
      if (!menuRef.current?.contains(e.target)) {
        setopen(false)
      }
    }
    document.addEventListener('mousedown', clickHandler)

    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  })

  useEffect(() => {
    //every time nav bar is rendered refresh the page once
    router.refresh()
  }, [])

  return (
    <nav
      className={`fixed z-20 flex h-20 w-full items-center justify-around bg-mainColor p-3 shadow-none dark:bg-slate-700 md:shadow-md`}
    >
      {/* logoName */}
      <div className="hidden items-center gap-1 md:flex">
        <Link href="/" className="block items-center gap-2 md:flex ">
          <Image
            width={110}
            height={110}
            src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742365333/buymesome_j4ja9q.png"
            alt="logo"
            className="block"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href="/en/about-us"
            className="text-secondaryColor font-semibold transition-colors font-inter"
          >
            {t('aboutUs')}
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link
            href="/en/contact-us"
            className="text-secondaryColor font-semibold transition-colors font-inter"
          >
            {t('contactUs')}
          </Link>
        </motion.div>
        
        {/* New Favourites and Reservations links - only visible when logged in */}
        {authState && !is_Admin && (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/en/Home/Account/favourites"
                className="text-secondaryColor font-semibold transition-colors font-inter"
              >
                {t('favourites')}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/en/Home/Account/reservations"
                className="text-secondaryColor font-semibold transition-colors font-inter"
              >
                {t('reservations')}
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* post and Profile */}
      <div className="hidden items-center gap-3 md:flex">
        {authState && !is_Admin && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/en/Home/Account/listings"
              className="border-secondaryColor text-secondaryColor block rounded-md border-2 p-2 px-3 font-semibold hover:bg-secondaryColor hover:text-mainColor transition-colors md:text-sm"
            >
             {t('postRoom')}
            </Link>
          </motion.div>
        )}

        <div className="flex items-center gap-2">
          {authState && <NotificationDropdown />}
          <div ref={menuRef}>
            <InititailModalC
              authState={authState}
              ref={menuRef}
              is_Admin={is_Admin}
            />
          </div>
        </div>
      </div>
      
      
      
    </nav>
  )
}

export default NavBar

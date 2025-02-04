'use client'

import { useState, useEffect, useRef } from 'react'
import InititailModalC from './navmodel'
import { createRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Search from './searchButton'
import Image from 'next/image'

interface NavProps {
  theme: string
  authState: boolean
  img: string
  is_Admin: boolean
}

const NavBar = ({ authState, img, is_Admin }: NavProps): JSX.Element => {
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
      className={`fixed z-20 flex h-20 w-full items-center justify-around bg-white p-3 shadow-none dark:bg-slate-700  md:shadow-md`}
    >
      {/* logoName */}

      <div className=" hidden items-center gap-1 md:flex">
        <Link href="/" className="block items-center gap-2 md:flex ">
          <Image
            width={100}
            height={100}
            src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1737989511/mero-removebg-preview_xr1hum.png"
            alt="logo"
            className="block "
          />
        </Link>
      </div>

      {/* search Bar */}
      <div className=" my-2 w-[95%] md:w-[35%] ">
        <Search />
      </div>

      {/* post and Profile */}
      <div className="hidden items-center gap-3 md:flex">
        {/* <ToggleButton theme={theme} /> */}

        <Link
          href="/Home/Account/listings"
          className=" border-gray-200 text-gray-700   dark:text-gray-300  block rounded-md border-2  p-2 px-3 font-semibold hover:border-[#66cd8b] md:text-sm"
        >
          Post Room
        </Link>

        <div ref={menuRef}>
          <InititailModalC
            authState={authState}
            ref={menuRef}
            is_Admin={is_Admin}
          />
        </div>
      </div>
    </nav>
  )
}

export default NavBar

'use client'

import { useState, useEffect, useRef } from 'react'
import InititailModalC from './navmodel'
import { createRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Search from './searchButton'
import Image from 'next/image'


interface NavProps {
  theme: string,
  authState:boolean,
  img:string
  is_Admin:boolean

}




const NavBar = ({authState,img,is_Admin}: NavProps): JSX.Element => {
  //get auth state and pass into the initial model
  const [open, setopen] = useState(false)
  const menuRef = createRef<HTMLDivElement>()
  const router=useRouter()


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

  useEffect(()=>{
    //every time nav bar is rendered refresh the page once 
    router.refresh();
  },[])



  return (
    <nav className={`fixed z-20 flex h-20 w-full items-center justify-around bg-white p-3 shadow-none dark:bg-slate-700  md:shadow-md`} >
      {/* logoName */}

      <div className=" hidden items-center gap-1 md:flex">
        <Link
          href="/"
          className="block items-center gap-2 md:flex "
        >
          <Image width={40} height={40} src="/airbnb.png" alt="logo" className="block " />
        </Link>

        <Link
          href="/"
          className="block text-lg font-semibold text-mainColor drop-shadow-xl dark:text-themeColor "
        >
          MeroGhar
        </Link>
      </div>

      {/* search Bar */}
      <div className=" w-[95%] my-2 md:w-[35%] ">
       <Search />
      </div>

      {/* post and Profile */}
      <div className="hidden items-center gap-2 md:flex">
        {/* <ToggleButton theme={theme} /> */}
        <Link
          href="/Account/listings"
          className=" block rounded-md border-2  font-semibold  border-gray-200 p-2 px-3  text-gray-700 hover:border-themeColor dark:text-gray-300 md:text-sm"
        >
          Post Room
        </Link>

        <div ref={menuRef}>
          <button
            className="flex items-center gap-1  rounded-lg border-2 border-gray-200  px-2 py-1 hover:border-themeColor dark:bg-slate-300 "
            onClick={(e) => setopen(!open)}
          >
            <Image width={20} height={20} src="/menu.png" alt="user" />
            <Image width={32} height={32} src={img==''? '/user.png':img} alt="user" className="h-8 w-8 rounded-full " />
          </button>

          {open && <InititailModalC authState={authState} ref={menuRef} is_Admin={is_Admin} />}
          
          
          {/* <LoginSignup login={true} modal={true} /> */}
            
        </div>
      </div>
      
    </nav>
  )
}

export default NavBar

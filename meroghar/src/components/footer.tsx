'use client'

import Link from 'next/link'

import {TfiWorld} from 'react-icons/tfi'
import {FiSearch} from 'react-icons/fi'
import {AiOutlineHeart} from 'react-icons/ai'
import {VscAccount} from 'react-icons/vsc'


const LinkStyle='mx-4 sm:mx-7 flex  flex-col items-center gap-1'

//footer is going to be server render
export  function PrimaryFooter(): JSX.Element {
  //check get auth state from initail root layout then conditionally render footerchild
  //path=router.patth
  const active=false
  const Svgstyle=active ? 'h-6  w-6  fill-themeColor': 'h-6 w-6 fill-gray-400 stroke-0    transition-all  hover:fill-themeColor'
  return (
    <main className='fixed bg-white  bottom-0  w-full border-gray-200'>
      <footer className=" p-2 flex justify-center items-center border-2  md:hidden">

      <Link href="/" className={LinkStyle}>
        <FiSearch className='h-6 w-6  stroke-gray-400 hover:stroke-themeColor' />
          <span className="text-xs ">Home</span>
      </Link>

      <Link href="/wishList" className={LinkStyle}>
        <AiOutlineHeart className={Svgstyle} />
          <span className="text-xs ">WishList</span>
      </Link>

      <Link href="/bookings" className={LinkStyle}>
        <TfiWorld className={Svgstyle} />
          <span className="text-xs ">Trips</span>
      </Link>






    {/* additional feature  */}
      {/* <Link href="/" className={LinkStyle}>
        <FiMessageSquare className={`h-6 w-6 stroke-gray-400 hover:stroke-themeColor`} />
          <span className="text-xs ">Inbox</span>
      </Link> */}

      <Link href="/" className={LinkStyle}>
        <VscAccount className={`h-6 w-6 fill-gray-400 hover:fill-themeColor`} />
          <span className="text-xs ">Profile</span>
      </Link>



      </footer>
    </main>

  )
}



export const SecondaryFooter=()=>{
  return(
    <main className='fixed bg-white  bottom-0  w-full border-gray-200'>
    <footer className="hidden fixed bottom-0 left-0  w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-3 dark:bg-slate-700 dark:border-gray-600">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/" className="hover:underline">MeroGhar</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6 text-gray-700 dark:text-gray-300">About</Link>
        </li>
        <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6 text-gray-700 dark:text-gray-300">Privacy Policy</Link>
        </li>
        <li>
            <Link href="#" className="mr-4 hover:underline md:mr-6t ext-gray-700 dark:text-gray-300">Licensing</Link>
        </li>
        <li>
            <Link href="#" className="hover:underline text-gray-700 dark:text-gray-300">Contact</Link>
        </li>
    </ul>
</footer>
  </main>
  )
}
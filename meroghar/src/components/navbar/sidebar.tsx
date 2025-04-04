'use client'

import Link from 'next/link'

import { HiUser, HiHeart, HiHome } from 'react-icons/hi'
import { MdManageAccounts, MdOutlineReviews } from 'react-icons/md'

import { AiFillSetting } from 'react-icons/ai'
import { RiLockPasswordFill, RiAdminFill } from 'react-icons/ri'

import { BsFillHouseCheckFill } from 'react-icons/bs'
import { ImUserCheck } from 'react-icons/im'

import { BiLogOut } from 'react-icons/bi'
import { forwardRef } from 'react'
import Api from '../../api/client/axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
interface props {
  is_Admin: boolean
  menu: boolean
}

type Ref = HTMLDivElement;

import { useState } from 'react'
import Image from 'next/image'

// takes in role and renders some element while others dont 
const SideBar = forwardRef<Ref, props>((props, ref): JSX.Element => {

  const trans = '-translate-x-full '

  const router = useRouter()

  return (
    <div className={`fixed top-[80px] w-[100%] bg-slate-500 bg-opacity-50 left-0 z-20 h-screen sm:w-64  border-r-2 border-gray-200 shadow-lg transition-transform ${props.menu ? '' : trans} md:translate-x-0 md:top-0 md:w-[220px] lg:w-64 sm:bg-white sm:opacity-100`}

    >

      {/* content div */}
      <div className="h-full z-40 w-64 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-slate-700  sm:w-full" ref={ref}>

        <div >
          {/* content */}

          {!props.menu && <div className="flex justify-center">
            <Link
              href="/"
              className="my-6 px-2"
            >
              <Image
                width={100}
                height={100}
                src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742365333/buymesome_j4ja9q.png"
                alt="MeroGhar"
                className="h-22 w-22 object-contain hover:scale-105 transition-transform"
                priority
              />
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />
          </div>
          }


          <Link
            href="/Admin"
            className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Dashboard
            </span>
          </Link>

          <Link
            href="/Admin/users"
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <HiUser className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Users
            </span>
          </Link>



          {props.is_Admin && <Link
            href="/Admin/kycRequest"
            className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <ImUserCheck className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Kyc Requests
            </span>
          </Link>}



          <Link
            href={'Admin/listing'}
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <HiHome className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Listings
            </span>
          </Link>


          <Link
            href={'/Admin/listingRequest'}
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <BsFillHouseCheckFill className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Listing Requests
            </span>
          </Link>

          <Link
            href="/Admin/bookings"
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Bookings
            </span>
          </Link>

          {/* <Link
              href="/Account/reviews"
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <MdOutlineReviews className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Reviews
              </span>
            </Link> */}


          {/* {
            !props.is_Admin&&<Link
            href="#"
            className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
          >
            <BsFillChatLeftFill className="h-5 w-5 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
            <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
              Message
            </span>
          </Link>
           } */}




          <div className='rounded-lg'>

            {/* <button
               className="w-full group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
              onClick={(e)=>{
                e.preventDefault();
                setaccount(!account)
              }}
            >
              <AiFillSetting className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Settings
              </span>
            </button> */}

            <div className='w-[full] mx-auto '>
              <Link
                href="/Admin/account"
                className=" group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
              >
                <MdManageAccounts className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
                <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                  Account
                </span>
              </Link>

              {/* <Link
              href="/Account/password"
              className="my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <RiLockPasswordFill className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Change Password
              </span>
            </Link> */}

            </div>
          </div>





          {/* { props.is_Admin&&<Link
              href="#"
              className=" my-2 group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <RiAdminFill className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Add Admin
              </span>
            </Link>} */}

          <hr className=" my-5 border-gray-400" />

          <div className=''>

            <button
              onClick={(e) => {
                e.preventDefault()

                // Start the logout API call but don't wait for it
                const logoutRequest = Api.delete('/auth/v1/logout', { withCredentials: true })
                  .catch(() => { }) // Ignore errors since we're logging out anyway

                // Immediately redirect
                router.push('/Home')

                // Show success message
                toast.success('Logged out successfully')

                // Force a hard refresh after a short delay to ensure state is cleared
                setTimeout(() => {
                  router.refresh()
                }, 100)
              }}
              className="w-full group flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-hoverColor dark:text-white dark:hover:bg-slate-500"
            >
              <BiLogOut className="h-6 w-6 fill-gray-500 transition duration-75 group-hover:fill-gray-900 dark:fill-gray-400 dark:group-hover:fill-white" />
              <span className="ml-3 dark:text-gray-300 dark:group-hover:text-white">
                Log out
              </span>
            </button>
          </div>





        </div>
      </div>
    </div>

  )
})


SideBar.displayName = 'SideBar';

export default SideBar;
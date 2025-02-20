'use client'
import Link from 'next/link'

import Wish from '../Svg/wishSvg'

import { FiEdit } from 'react-icons/fi'
import { BsHouseCheckFill, BsFillHouseDashFill } from 'react-icons/bs'
import { IBooking, Property } from '../../interface/response'
// hover:-translate-y-1 hover:scale-105
import { useState } from 'react'
import useModal from '../../store/useModal'
import useConfirm from '../../store/useConfirm'
import { toast } from 'react-hot-toast'
import { verifyProperty } from '../../api/client/admin'
import { useRouter } from 'next/navigation'
import useRandom from '../../store/randomStore'
import Api from '../../api/client/axios'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import {
  AiFillStar,
  AiFillHourglass,
  AiFillCheckCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai'
import { RxCrossCircled } from 'react-icons/rx'
import { Payment } from '../../interface/response'
import useReject from '../../store/useReject'
import Image from 'next/image'

//admin card
interface props {
  use?: string
  data?: Partial<Property>
  booking?: Partial<IBooking>
  payment?: Partial<Payment>
  key: number
  index?: number
  wish?: boolean
  user?: string
}
export default function Card({ use, data, key, wish, user, index }: props) {
  const [img, setimg] = useState(0)

  const {
    images,
    _id,
    avgRating,
    country,
    city,
    rate,
    name,
    isVerified,
    isBanned,
  } = data!

  const modal = useModal()
  const confirm = useConfirm()
  const reject = useReject()
  const list = useRandom()
  const router = useRouter()

  return (
    <div>
      {/* {use=='userlisting'&&isVerified!.message!==''&&(!isVerified!.status)&&<div className=' mx-auto border-2 rounded-lg w-[97%] p-2 '>
    <span className='flex items-center gap-x-1 text-red-500'>{isVerified?.message}</span>
    </div>} */}

      <div
        key={key}
        className="border-gray-100 mb=[-4]  mx-auto my-auto h-fit w-[85%] overflow-hidden rounded-xl border-[1px] bg-white  shadow-md duration-300 hover:border-b-lime-900  hover:shadow-2xl"
      >
        <div className="group relative ">
          <Link href={`/Home/rooms/${_id}`} target="_blank">
            <div className="h-56  w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 ">
              <Image fill={true} src={images![img]!.imgUrl} alt="property" />
            </div>
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault()
              if (img == 0) {
                return console.log('o here')
              }
              return setimg(img - 1)
            }}
            className=" bg-gray-100 absolute  top-[45%] rounded-full bg-opacity-70 p-3 opacity-0 transition-all hover:bg-[#59b077] hover:bg-opacity-100 hover:drop-shadow-lg group-hover:opacity-100"
          >
            <Image src="/left.png" alt="arrow" height={9} width={9} />
          </button>

          <button
            onClick={() => {
              if (img == images!.length! - 1) {
                return console.log('o here')
              }
              return setimg(img + 1)
            }}
            className="bg-gray-100 absolute top-[45%] right-0 rounded-full bg-opacity-70 p-3 opacity-0 transition-all hover:bg-[#59b077] hover:bg-opacity-100 hover:drop-shadow-lg group-hover:opacity-100"
          >
            <Image src="/arrow.png" alt="arrow" height={9} width={9} />
          </button>

          <div className="absolute bottom-2 flex w-full justify-center">
            <div className="flex items-center space-x-1">
              {[...Array(images?.length || 0)].map((_, index) => (
                <svg
                  key={index}
                  className={`h-2 w-2 ${
                    img === index ? 'fill-white' : 'fill-gray-500'
                  }`}
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
              ))}
            </div>
          </div>

          <div className="absolute top-3 right-2">
            {use == 'card' && (
              <div className="relative">
                <Wish active={wish!} id={_id!} user={user} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-2 mx-auto  w-[85%]  p-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{name}</p>
          <div className="flex items-center gap-x-[2px]">
            <AiFillStar className="h-3 w-3" />
            <span className="text-gray-600  text-md">{avgRating}</span>
          </div>
        </div>

        {use == 'adminlisting' ||
          (use == 'userlisting' && (
            <div className="my-2">
              {!isBanned!.status && (
                <p className="text-gray-600 flex gap-x-1 text-sm font-semibold">
                  Status:{' '}
                  <span className="flex items-center gap-x-1 ">
                    {isVerified?.pending && 'Pending'}{' '}
                    {isVerified?.pending == isVerified?.status && 'Rejected'}
                    {isVerified?.status && 'Verified'}
                    {isVerified?.pending && (
                      <AiFillHourglass className="h-5 w-5" />
                    )}{' '}
                    {isVerified?.pending == isVerified?.status && (
                      <RxCrossCircled className="h-5 w-5 " />
                    )}
                    {isVerified?.status && (
                      <AiFillCheckCircle className="h-5 w-5" />
                    )}
                  </span>
                </p>
              )}

              {isBanned!.status && (
                <p className="text-gray-600 flex gap-x-1 text-sm font-semibold">
                  Status:{' '}
                  <span className="flex items-center gap-x-1 ">
                    Banned
                    <RxCrossCircled className="h-5 w-5 " />
                  </span>
                </p>
              )}
            </div>
          ))}

        <p className="mb-1 text-xs font-medium text-stone-700 ">
          {country},{city}
        </p>

        {/* {isBooked&&<p className='text-sm mb-2 font-semibold text-black '>Booked</p>} */}

        <p className="gray-600   text-sm ">
          <span className="text-xs font-bold">${rate}</span>
          <span className="ml-1 text-sm">Night</span>
        </p>
      </div>
      {use == 'adminlisting' && (
        <div className="my-2 mx-auto mt-4 w-[95%] ">
          <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
            onClick={(e) => {
              e.preventDefault()
              console.log('verify')

              confirm.onContent({
                header: 'Are You Sure To Verify Property?',
                actionBtn: 'Verify',
                onAction: async () => {
                  const res = await verifyProperty(_id!, { isVerified: true })
                  if (res) {
                    toast.success(`Property ${_id!} verified successfully`)
                    modal.onClose()
                    return router.refresh()
                  }

                  toast.error('Failed to verify Property')
                  return modal.onClose()
                },
              })

              modal.onOpen('confirm')
            }}
          >
            <BsHouseCheckFill className="mr-2 h-4 w-4" />
            Verify
          </button>

          <button
            type="button"
            className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            onClick={(e) => {
              e.preventDefault()
              console.log('reject')
              //set id

              //simpley button
              reject.setbtn('Reject')

              reject.onContent({
                onReject: async (message: string) => {
                  const res = await verifyProperty(_id!, {
                    isVerified: false,
                    message,
                  })

                  if (res) {
                    toast.success('Property Post Rejected')
                    modal.onClose()
                    return router.refresh()
                  }
                  toast.error('Property rejection Failed!')
                  return modal.onClose()
                },
              })
              //modal open for rejection
              modal.onOpen('reject')
            }}
          >
            <BsFillHouseDashFill className="mr-2 h-4 w-4" />
            Reject
          </button>
        </div>
      )}
      {use == 'userlisting' && (
        <div className="my-2 mx-auto mt-4 w-[95%] ">
          <button
            type="button"
            className="me-2 mb-2 rounded-lg bg-[#66cd8b] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#59b077] focus:outline-none focus:ring-4 focus:ring-[#59b077]"
            onClick={(e) => {
              e.preventDefault()
              list.setIndex(index!)
              list.onList('edit')
            }}
          >
            Update
          </button>

          <button
            type="button"
            className="me-2 border-gray-200 text-gray-900 hover:bg-gray-100 focus:ring-gray-100   mb-2 ml-3 rounded-lg border bg-white py-2.5 px-5 text-sm font-medium hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
            onClick={() => {
              confirm.onContent({
                header: 'Are You Sure To Delete Property?',
                actionBtn: 'Delete',
                onAction: () => {
                  Api.delete(`/property/v1/deleteProperty/${_id}`, {
                    withCredentials: true,
                  })
                    .then(() => {
                      toast.success(`Property ${_id!} deleted successfully`)
                      modal.onClose()
                      return router.refresh()
                    })
                    .catch(() => {
                      toast.error(
                        'Failed to delete Property/Property Booked currently'
                      )
                      return modal.onClose()
                    })
                },
              })

              modal.onOpen('confirm')
            }}
          >
            Delete
          </button>
        </div>
      )}
      {use == 'trips' && (
        <div className="my-2 mx-auto mt-4 w-[95%] ">
          <button
            type="button"
            className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
            onClick={(e) => {
              e.preventDefault()
              list.setIndex(key)
              list.onList('edit')
            }}
          >
            <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
            CheckIn
          </button>

          <button
            type="button"
            className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
            onClick={() => {
              confirm.onContent({
                header: 'Are You Sure To Delete Property?',
                actionBtn: 'Delete',
                onAction: () => {
                  Api.delete(`/property/v1/deleteProperty/${_id}`, {
                    withCredentials: true,
                  })
                    .then(() => {
                      toast.success(`Property ${_id!} deleted successfully`)
                      modal.onClose()
                      return router.refresh()
                    })
                    .catch(() => {
                      toast.error(
                        'Failed to delete Property/Property Booked currently'
                      )
                      return modal.onClose()
                    })
                },
              })

              modal.onOpen('confirm')
            }}
          >
            <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
            Booking
          </button>
        </div>
      )}
    </div>
  )
}

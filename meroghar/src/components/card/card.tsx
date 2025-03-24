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
    <div className="h-full">
      <div
        key={key}
        className="border-gray-100 mx-auto h-fit w-full overflow-hidden rounded-xl border-[1px] bg-white shadow-md duration-300 hover:shadow-xl"
      >
        <div className="group relative">
          <Link href={`/en/Home/rooms/${_id}`} target="_blank">
            <div className="relative h-64 w-full overflow-hidden">
              <Image 
                src={images![img]!.imgUrl} 
                alt={name || "Property"} 
                className="object-cover" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>

          <div className="absolute bottom-2 flex w-full justify-center">
            <div className="flex items-center space-x-1">
              {[...Array(images?.length || 0)].map((_, index) => (
                <svg
                  key={index}
                  className={`h-2 w-2 ${
                    img === index ? 'fill-white' : 'fill-gray-500'
                  }`}
                  viewBox="0 0 8 8"
                  onClick={() => setimg(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
              ))}
            </div>
          </div>

          <div className="absolute top-3 right-3">
            {use == 'card' && (
              <div className="relative">
                <Wish active={wish!} id={_id!} user={user} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-center justify-between">
          <p className="text-sm text-rubik font-semibold">{name}</p>
          <div className="flex items-center gap-x-[2px]">
            <AiFillStar className="h-3 w-3" />
            <span className="text-gray-600 text-md">{avgRating}</span>
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
          <span className="ml-1 text-xs font-semibold">Night</span>
        </p>
      </div>
      {use == 'adminlisting' && (
        <div className="my-2 mx-auto mt-4 w-[95%] ">
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-[#99775C] bg-white px-3 py-2 text-center text-sm font-medium text-[#99775C] hover:bg-[#99775C] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#99775C]/50"
            onClick={(e) => {
              e.preventDefault()
              console.log('verify')

              confirm.onContent({
                header: 'Are you sure you want to verify Property?',
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
            className="ml-2 inline-flex items-center rounded-lg border border-[#99775C] bg-white px-3 py-2 text-center text-sm font-medium text-[#99775C] hover:bg-[#99775C] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#99775C]/50"
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
            className="me-2 mb-2 rounded-lg bg-[#99775C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#886a52] focus:outline-none focus:ring-4 focus:ring-[#99775C]/50"
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
            className="me-2 border-gray-200 text-gray-900 hover:bg-gray-100 focus:ring-gray-100 mb-2 ml-3 rounded-lg border bg-white py-2.5 px-5 text-sm font-medium hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
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
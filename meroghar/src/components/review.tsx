'use client'

import Link from 'next/link'
import {
  AiFillStar,
  AiOutlineEdit,
  AiOutlineDelete,
  AiFillDelete,
} from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'

import { useState } from 'react'
import ReviewInput from './reviewInput'
import { IReview } from './../interface/response'
import moment from 'moment'
import useConfirm from '../store/useConfirm'
import useModal from '../store/useModal'
import Api from '../api/client/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  reviewData: IReview
  currentUser: string
  key: number
}
export default function Review({ reviewData, currentUser, key }: Props) {
  const [Edit, setEdit] = useState('')
  const confirm = useConfirm()
  const modal = useModal()
  const router = useRouter()
  return (
    <div
      key={key}
      className="rounded-lg border border-[#99775C]/10 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      {Edit == '' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex w-full items-center gap-x-3">
              <Link
                href={`/Home/user/${reviewData.userId._id}`}
                target="_space"
              >
                <Image
                  src={
                    reviewData.userId.profileImg?.imgUrl == ''
                      ? '/user.png'
                      : reviewData.userId.profileImg!.imgUrl
                  }
                  alt="User"
                  height={48}
                  width={48}
                  className="block h-12 w-12 rounded-full border border-[#99775C]/20 object-cover"
                />
              </Link>

              <div>
                <span className="block font-semibold text-[#99775C]">
                  {reviewData.userId.userName}
                </span>
                <span className="text-[#99775C]/70 text-sm">
                  {moment(reviewData.createdAt).format('MMM DD, YYYY')}
                </span>
              </div>
            </div>

            {currentUser == reviewData.userId._id && (
              <div className="flex items-center gap-x-3">
                <button
                  onClick={(e) => {
                    setEdit(reviewData._id)
                  }}
                  className="text-[#99775C]/70 hover:text-[#99775C] transition-colors"
                >
                  <FiEdit className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => {
                    confirm.onContent({
                      header: 'Are you sure you want to delete this review?',
                      actionBtn: 'Delete',
                      onAction: () => {
                        Api.delete(`/property/v1/review/${reviewData._id}`, {
                          withCredentials: true,
                        })
                          .then((res) => {
                            toast.success('Review Deleted Successfully!!')
                            router.refresh()
                            return modal.onClose()
                          })
                          .catch((e) => {
                            toast.error('Failed to Delete Review!!!')
                            return modal.onClose()
                          })
                      },
                    })

                    modal.onOpen('confirm')
                  }}
                  className="text-red-400 hover:text-red-500 transition-colors"
                >
                  <AiFillDelete className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center mb-3">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <AiFillStar
                key={index}
                className={`h-5 w-5 ${
                  index < reviewData.rating 
                    ? 'text-[#99775C] fill-[#99775C]' 
                    : 'text-gray-300 fill-886a52'
                }`}
              />
            ))}
          </div>

          <p className="text-[#886a52] leading-relaxed">{reviewData.review}</p>
        </div>
      )}

      {/* Edit mode */}
      {Edit == reviewData._id && (
        <ReviewInput
          userData={reviewData.userId}
          propertyId={reviewData.propertyId}
          reviewId={reviewData._id}
          setEdit={setEdit}
          edit={true}
          rating={reviewData.rating}
          Review={reviewData.review}
        />
      )}
    </div>
  )
}

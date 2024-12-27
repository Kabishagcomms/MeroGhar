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
import { IReview } from '../interface/response'
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
  key:number
}
export default function Review({ reviewData, currentUser,key}: Props) {
  const [Edit, setEdit] = useState('')
  const confirm=useConfirm();
  const modal=useModal()
  const router=useRouter();
  return (
    <div key={key} className="rounded-lg bg-white border-2 border-gray-100 p-4 shadow-lg">
      {Edit == '' && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center gap-x-3 ">
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
                  className="b-2 block h-12 w-12 rounded-lg border-gray-300"
                />
              </Link>

              <p>
                <span className="text-md block font-semibold">
                  {reviewData.userId.userName}
                </span>
                <span className="text-sm text-gray-800 ">
                  Date: {moment(reviewData.createdAt).format('MM/YY/DD')}
                </span>
              </p>
            </div>

            {currentUser == reviewData.userId._id && (
              <div className="mr-2 flex items-center gap-x-3">
                <button
                  onClick={(e) => {
                    setEdit(reviewData._id)
                  }}
                >
                  <FiEdit className="mt-[2px] h-5 w-5 stroke-gray-500 hover:stroke-black" />
                </button>

                <button onClick={(e)=>{
                  const onDelete=()=>{
                    Api.delete(`/property/v1/review/${reviewData._id}`,{withCredentials:true}).then((res)=>{
                      toast.success("Review Deleted Successfully!!");
                       router.refresh();
                       return modal.onClose();
                    }).catch((e)=>{
                      toast.error("Failed to Deleted Review");
                      return modal.onClose();
                    })
                  }

                  confirm.onContent({
                    header:"Are You Sure to delete Review",
                    actionBtn:"Delete",
                    onAction:onDelete
                  })
                  
                  modal.onOpen('confirm');

                }}>
                  <AiFillDelete className="h-6 w-6 fill-gray-500 hover:fill-black" />
                </button>
              </div>
            )}
          </div>

          <p className="text-md my-3 mt-4 text-gray-700">{reviewData.review}</p>
          <div className="flex items-center justify-between">
            <p className="my-2 ml-1 flex items-center gap-x-2">
              <AiFillStar className="mt-[2px] h-4 w-4" />
              <span className="block text-sm font-semibold">
                {reviewData.rating}.0
              </span>
            </p>
          </div>

          {/* send api request to report this review so it can be checked by admin  can only be seen by owner*/}

          {currentUser == reviewData.hostId && (
            <button className="mr-4 flex items-center gap-x-2 underline">
              <Image height={20}  width={20} src="/flag.png" alt="flag" className="block h-5 w-5" />
              <span className="block text-sm font-semibold text-gray-500 hover:text-black">
                Report Review
              </span>
            </button>
          )}
        </div>
      )}

      {/* render other comp here */}
      {Edit == reviewData._id && (
        <div>
          <ReviewInput
            rating={reviewData.rating}
            Review={reviewData.review}
            propertyId={reviewData.propertyId}
            reviewId={reviewData._id}
            edit={true}
            userData={reviewData.userId}
            setEdit={setEdit}
          />
        </div>
      )}
    </div>
  )
}

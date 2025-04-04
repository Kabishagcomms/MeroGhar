'use client'

import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdCancel } from 'react-icons/md'
import { kycRequests } from '../../api/server/user/getUser'
import useModal from '../../store/useModal'
import useConfirm from '../../store/useConfirm'
import { verifyKyc } from '../../api/client/admin'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useReject from '../../store/useReject'
import * as _ from 'lodash'
import Image from 'next/image'

interface UserProps {
  userData: kycRequests
}

export default function UserCard({ userData }: UserProps) {
  const modal = useModal()
  const confirm = useConfirm()
  //store
  const reject = useReject()
  const router = useRouter()
  const { userName, userId, _id, profileImg, about } = userData

  return (
    <main data-testid="user-card" className="mx-auto w-[95%] rounded-lg border-2 border-gray-200 bg-white p-4 duration-300  hover:shadow-xl  sm:w-[80%] ">
      <Link href={`/Home/user/${_id}`} target="_space">
        <div className="mt-2 mb-4 w-fit">
          <Image
            src={profileImg.imgUrl != '' ? profileImg.imgUrl : '/user.png'}
            alt="property"
            height={112}
            width={112}
            className="  rounded-full"
          />
        </div>
      </Link>

      <div className="text-md mt-3 font-semibold text-gray-700 ">
        {_.capitalize(userName)}
      </div>
      <p className="mt-1  text-sm font-semibold text-gray-500">
        {about}
      </p>

      <div className="mt-4 flex items-center gap-x-2  ">
        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-[#22c55e] px-3 py-2 text-center text-sm font-medium text-white hover:bg-[#16a34a] focus:ring-4 focus:ring-[#86efac] transition-transform duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault()
            console.log('verify')

            confirm.onContent({
              header: 'Are You Sure To Verify?',
              actionBtn: 'Verify',
              onAction: async () => {
                const res = await verifyKyc(_id, { isVerified: true })
                if (res) {
                  toast.success(`User ${userId} verified successfully`)
                  modal.onClose()
                  return router.refresh()
                }

                toast.error('Failed to verify User')
                return modal.onClose()
              },
            })

            modal.onOpen('confirm')
          }}
        >
          <GoVerified className="mr-2 h-4 w-4" />
          Verify
        </button>
        <button
          type="button"
          className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
          onClick={(e) => {
            e.preventDefault()
            console.log('reject')

            //set btn name
            reject.setbtn('Reject')

            reject.onContent({
              onReject: async (message: string) => {
                try {
                  const res = await verifyKyc(_id, {
                    isVerified: false,
                    message,
                  })
                  if (res) {
                    toast.success('User kyc Rejected')
                    modal.onClose()
                    return router.refresh()
                  }
                  toast.error('Kyc rejection Failed!')
                  return modal.onClose()
                } catch (e) {
                  console.log(e)
                  return toast.error('Kyc rejection Failed!')
                }
              },
            })

            modal.onOpen('reject')
          }}
        >
          <MdCancel className="mr-2 h-4 w-4" />
          Reject
        </button>
      </div>
    </main>
  )
}

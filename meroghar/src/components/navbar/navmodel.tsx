import Link from 'next/link'
import { forwardRef } from 'react'

import useModal from '../../store/useModal'
import Api from '../../api/client/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const btnstyle =
  'w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor'

interface NavModal {
  authState: boolean
  is_Admin: boolean
}

type Ref = HTMLDivElement

const NavModal = forwardRef<Ref, NavModal>((props, ref) => {
  const modal = useModal()
  const router = useRouter()

  if (!props.authState) {
    return (
      <div
        ref={ref}
        className="absolute top-[68px]  z-50  flex w-60 translate-x-[-69%] flex-col gap-2 overflow-hidden rounded-lg  border-2 border-gray-100  bg-white p-1 shadow-xl   "
      >
        <button
          className={`${btnstyle} font-semibold`}
          onClick={(e) => {
            e.preventDefault()
            modal.onOpen('login')
          }}
        >
          Log in
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            modal.onOpen('signup')
          }}
          className={btnstyle}
        >
          Sign Up
        </button>
        <hr />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="absolute top-[68px]  z-50  flex w-60 translate-x-[-69%] flex-col gap-2 overflow-hidden rounded-lg  border-2 border-gray-100  bg-white p-1 shadow-xl    "
    >
      {!props.is_Admin && (
        <div className="flex flex-col gap-2 ">
          <hr />
        </div>
      )}

      <hr />
      <button
        className={btnstyle}
        onClick={(e) => {
          e.preventDefault()
          const res = Api.delete('/auth/v1/logout', { withCredentials: true })
            .then((res) => {
              toast.success('User logged Out')
              router.refresh()
              return router.push('/Home')
            })
            .catch((e) => {
              toast.success('User logged Out')
              router.refresh()
              return router.push('/Home')
            })
        }}
      >
        Log Out
      </button>
    </div>
  )
})

NavModal.displayName = 'NavModal'

export default NavModal

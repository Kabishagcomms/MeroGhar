import Link from 'next/link'
import { forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import useModal from '../../store/useModal'
import Api from '../../api/client/axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const btnstyle =
  'w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor'

interface NavModalProps {
  authState: boolean
  is_Admin: boolean
}

const NavModal = forwardRef<HTMLDivElement, NavModalProps>((props, ref) => {
  const modal = useModal()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2">
          <Avatar>
            <AvatarImage src="/avatar-placeholder.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {!props.authState ? (
          <>
            <DropdownMenuItem
              className="data-[highlighted]:text-[#66cd8b]"
              onClick={() => modal.onOpen('login')}
            >
              Log in
            </DropdownMenuItem>
            <DropdownMenuItem
              className="data-[highlighted]:text-[#66cd8b]"
              onClick={() => modal.onOpen('signup')}
            >
              Sign Up
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {props.is_Admin && (
              <DropdownMenuItem asChild>
                <Link href="/Admin" className="font-semibold">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/Home/Account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await Api.delete('/auth/v1/logout', { withCredentials: true })
                  toast.success('User logged out')
                  router.refresh()
                  router.push('/Home')
                } catch (error) {
                  toast.error('Logout failed')
                }
              }}
            >
              Log Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

NavModal.displayName = 'NavModal'

export default NavModal

import Link from 'next/link'
import { forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { getMe } from '@/api/server/user/getUser'
import useModal from '../../store/useModal'
import Api from '../../api/client/axios'
import { motion } from "framer-motion"
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface NavModalProps {
  authState: boolean
  is_Admin: boolean
}


const NavModal = forwardRef<HTMLDivElement, NavModalProps>((props, ref) => {
  const modal = useModal()
  const router = useRouter()

  

  if (!props.authState) {
    return (
      <div className="flex gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => modal.onOpen('login')}
            className="rounded-full bg-secondaryColor px-6 py-2 text-mainColor font-semibold hover:bg-secondaryHover transition-all duration-300"
          >
            Log in
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(153, 119, 92, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => modal.onOpen('signup')}
            className="rounded-full bg-mainColor px-6 py-2 text-secondaryColor font-semibold border-2 border-secondaryColor hover:bg-secondaryColor hover:text-mainColor transition-all duration-300"
          >
            Sign Up
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 p-2 rounded-full"
        >
          <Avatar>
            <AvatarImage src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742368515/68747470733a2f2f6176617461722e6972616e2e6c696172612e72756e2f7075626c69632f626f793f757365726e616d653d53636f7474_s9ae24.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-60 bg-mainColor border border-secondaryColor/20"
      >
        {!props.authState ? (
          <>
            <DropdownMenuItem
              className="focus:bg-secondaryColor/10 focus:text-secondaryColor cursor-pointer"
              onClick={() => modal.onOpen('login')}
            >
              Log in
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-secondaryColor/10 focus:text-secondaryColor cursor-pointer"
              onClick={() => modal.onOpen('signup')}
            >
              Sign Up
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {props.is_Admin && (
              <DropdownMenuItem 
                asChild
                className="focus:bg-secondaryColor/10 focus:text-secondaryColor cursor-pointer"
              >
                <Link href="/Admin" className="font-semibold text-secondaryColor">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              asChild
              className="focus:bg-secondaryColor/10 focus:text-secondaryColor cursor-pointer"
            >
              <Link href="/Home/Account" className="text-secondaryColor font-semibold">
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-secondaryColor/10 font-semibold focus:text-secondaryColor cursor-pointer text-secondaryColor"
              onClick={() => {
                const logoutRequest = Api.delete('/auth/v1/logout', { withCredentials: true })
                  .catch(() => {})
                router.push('/Home')
                toast.success('Logged out successfully')
                setTimeout(() => {
                  router.refresh()
                }, 100)
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

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
import LanguageToggle from '../LanguageToggle' // Import the LanguageToggle component
import { useTranslations } from 'next-intl' // Import useTranslations
import { HiUser, HiHeart, HiHome } from 'react-icons/hi'
import { BsFillHouseCheckFill } from 'react-icons/bs'
import { RiAdminFill } from 'react-icons/ri'
import { BiLogOut } from 'react-icons/bi'

interface NavModalProps {
  authState: boolean
  is_Admin: boolean
}

const NavModal = forwardRef<HTMLDivElement, NavModalProps>((props, ref) => {
  const modal = useModal()
  const router = useRouter()
  const t = useTranslations('common') // Get translations for common namespace

  if (!props.authState) {
    return (
      <div className="flex gap-3 items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => modal.onOpen('login')}
            className="rounded-full bg-secondaryColor px-6 py-2 text-mainColor font-semibold hover:bg-secondaryHover transition-all duration-300"
          >
            {t('login')}
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
            {t('signup')}
          </Button>
        </motion.div>
        
        {/* Add Language Toggle */}
        <LanguageToggle />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Add Language Toggle outside dropdown for logged-in users */}
      <LanguageToggle className="mr-2" />
      
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
        <DropdownMenuContent align="end" className="w-56 mt-2 p-2">
          <DropdownMenuItem asChild>
            <Link href="/en/Home/Account" className="flex items-center gap-2 cursor-pointer">
              <HiUser className="h-4 w-4 text-[#99775C]" />
              <span>{t('account')}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/en/Home/trips" className="flex items-center gap-2 cursor-pointer">
              <HiHome className="h-4 w-4 text-[#99775C]" />
              <span>{t('trips')}</span>
            </Link>
          </DropdownMenuItem>

          

        

          {props.is_Admin && (
            <DropdownMenuItem asChild>
              <Link href="/Admin" className="flex items-center gap-2 cursor-pointer">
                <RiAdminFill className="h-4 w-4 text-[#99775C]" />
                <span>{t('admin')}</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-700"
            onClick={async () => {
              try {
                await Api.post('/auth/v1/logout', {}, { withCredentials: true })
                toast.success('Logged out successfully')
                router.refresh()
              } catch (error) {
                toast.error('Failed to logout')
              }
            }}
          >
            <BiLogOut className="h-4 w-4" />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
})
NavModal.displayName = 'NavModal';

export default NavModal;

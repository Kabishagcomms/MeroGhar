import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import { SocialLoginProps } from '../interface/buttons'
import Link from 'next/link'
import Image from 'next/image'

export function SocialLogin({
  placeholder,
  url,
  img,
}: SocialLoginProps): JSX.Element {
  return (
    <Link
      href={url}
      className="text-md group my-1 flex w-[95%]  items-center  rounded-md border-2  border-gray-500 p-2 hover:bg-mainColor"
    >
      <Image height={20} width={20} src={img} alt="google" className="h-5 w-5 rounded" />
      <span className=" w-[90%] text-center text-gray-600 group-hover:text-white">
        {placeholder}
      </span>
    </Link>
  )
}

interface ArrowProps {
  next: boolean
}
export function Arrow({ next }: ArrowProps) {
  return (
    <button className=" rounded-full bg-gray-100  bg-opacity-70 p-3 transition-all  hover:bg-white hover:bg-opacity-100 hover:drop-shadow-lg">
      <Image
        src={next ? '/arrow.png' : '/left.png'}
        alt="arrow"
        height={9}
        width={9}
      />
    </button>
  )
}

interface ThemeToggle {
  theme: string
}

//instead of passing and consitionally renderint the svg could have used dark mode to hide the unwanted svg 
export const ToggleButton = ({ theme }: ThemeToggle) => {
  const router = useRouter()
  const cookies = new Cookies()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        const theme = cookies.get('theme')
        if (theme == 'light'||!theme) {
          cookies.set('theme', 'dark')
          return router.refresh()
        }

        cookies.set('theme', 'light')
        return router.refresh()
      }}
      className="rounded-lg border-2 p-2 hover:border-themeColor dark:bg-slate-400"
    >
      {theme == 'light'?
        <svg
          xmlns="http://www.w3.org/2000/svg"
          
          viewBox="0 0 24 24"
          stroke-width="2"
         
          className="h-5 w-5 fill-slate-700 stroke-slate-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
       : 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          className="h-5 w-5  stroke-slate-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      }
    </button>
  )
}

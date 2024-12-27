import Link from "next/link"

'use Client'


interface FooterChild {
    page: string
    active: boolean
  }
  
export default function FooterChild({ page, active }: FooterChild) {
    const Svgstyle=active ? 'h-6  w-6 fill-gray-100 stroke-themeColor': 'h-6 w-6 fill-gray-100  stroke-gray-400  transition-all  hover:stroke-themeColor'
    const LinkStyle='mx-4 sm:mx-7 flex  flex-col items-center gap-1'
    
    
    if (page == 'Explore') {
      return (
        <Link href="/" className={LinkStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            className={Svgstyle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span className="text-xs ">{page}</span>
        </Link>
      )
    }
  
    if (page == 'WishList') {
      return (
        <Link
          href="/wishList"
          className={LinkStyle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            className={Svgstyle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
  
          <span className="text-xs ">{page}</span>
        </Link>
      )
    }
  
    if (page == 'Log in'||page=="Profile") {
      return (
        <Link href={page=='Log in'? '/login':"/Account"} className={LinkStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className={Svgstyle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
  
          <span className="text-xs ">{page}</span>
        </Link>
      )
    }
  
    if (page == 'Trips') {
      return (
        <Link href="/Bookings" className={LinkStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className={Svgstyle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
  
          <span className="text-xs ">{page}</span>
        </Link>
      )
    }
  
    if (page == 'Inbox') {
      return (
        <Link href="#" className={LinkStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
          
            strokeWidth="1.5"
            className={Svgstyle}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
  
          <span className="text-xs ">{page}</span>
        </Link>
      )
    }
  
    return <h1>hello</h1>
  }
  
'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { differenceInDays } from 'date-fns'
import useModal from '../../store/useModal'

const Search = () => {
  const params = useSearchParams()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')
  const modal = useModal()

  return (
    <div
      onClick={(e) => modal.onOpen('search')}
      className="
    
   w-full
    cursor-pointer 
    overflow-hidden
    rounded-full
   
    border
    border-y-slate-300
    py-1 
    shadow-md 
    transition 
    hover:shadow-2xl
    md:w-auto
  "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            px-3 
            text-sm
            font-semibold 
            text-white
          "
        >
          Anywhere
        </div>
        <div
          className="
            hidden 
            flex-1 
            border-x-[2px] 
            px-3 
            text-center 
            text-sm 
            font-semibold
            text-white 
            sm:block
          "
        >
          AnyWeek
        </div>
        <div
          className="
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-2 
            pl-3 
            pr-1 
            text-sm
          "
        >
          <div className="hidden text-white sm:block">Guest</div>
          <div
            className="
              rounded-full 
              bg-[#99775C]
              p-2 
              text-white
              hover:bg-[#886a52]
              transition-colors
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search

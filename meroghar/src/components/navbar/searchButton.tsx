'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import useModal from '../../store/useModal';


const Search = () => {
  
  const params = useSearchParams();
 

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');
  const modal=useModal();

  
  return ( 
    <div
       onClick={(e)=>modal.onOpen('search')}
      className="
        border-[2px] 
        w-full 
        md:w-auto 
        py-1 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        overflow-hidden
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
            text-sm 
            font-semibold 
            px-3
          "
        >
         Anywhere
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-3 
            border-x-[2px] 
            flex-1 
            text-center
          "
        >
         AnyWeek
        </div>
        <div 
          className="
            text-sm 
            pl-3 
            pr-1 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-2
          "
        >
          <div className="hidden sm:block text-gray-600">Guest</div>
          <div 
            className="
              p-2 
              bg-themeColor
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;
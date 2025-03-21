'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Api from '../../api/client/axios'
import useModal from "../../store/useModal"
import { useRouter } from "next/navigation"


interface props {
  active: boolean
  id: string
  user?: string
}

export default function Wish({ active, id, user }: props) {
  const [isActive, setIsActive] = useState(active)
  const router=useRouter()
  const modal=useModal()
  console.log('in wishList',isActive)

 

  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        console.log(user)
          if(user=='') return modal.onOpen('login')
          if(user=='admin') return toast.error("Admin Cannot Have Favourites");
          if(user=='owner') return toast.error("owner cant add to WishList!!")

           
          if(!isActive){
            const res=Api.post(`/property/v1/wishList/${id}`,{},{withCredentials:true}).then((res)=>{
              console.log('added to wish list');
              toast.success("Property Added to Wish list");
              setIsActive(true)
             return  router.refresh();
            }).catch((e)=>{
             return  toast.error("Failed to Add property to Wish list!");
            })
          }

         // for deleting wishlist
          if(active){
            console.log('inside active')
            const res=Api.delete(`/property/v1/wishList/${id}`,{withCredentials:true}).then((res)=>{
              console.log("Wishlist removed");
              toast.success("Property Removed from wish list");
              setIsActive(false)
              return router.refresh();
            }).catch((e)=>{
              return toast.error("Failed to Remove Property From Favourites!!")
            })
          }
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={isActive ? 'var(--color-secondary)' : 'rgba(0, 0, 0, 0.5)'}
        stroke={isActive ? 'var(--color-secondary)' : 'white'}
        className="h-7 w-7 transition-colors duration-300 hover:fill-[var(--color-secondary)] hover:stroke-[var(--color-secondary)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </div>
  )
}

'use client'

interface WishProps{
    active:boolean
    id:string
    user?:string
}

import { useState } from "react"
import Api from "../../api/client/axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import useModal from "../../store/useModal"

export default function Wish({active,id,user}:WishProps){
    const[isActive,setIsActive]=useState(active)

    const router=useRouter()
    const modal=useModal()
    console.log('in wishList',isActive)
    return(
        <button onClick={(e)=>{
          console.log(user)
          if(user=='') return modal.onOpen('login')
          if(user=='admin') return toast.error("Admin Cannot Have Favourites");
          if(user=='owner') return toast.error("owner cant add to WishList!!")

           
          if(!isActive){
            const res=Api.post(`/property/v1/wishList/${id}`,{},{withCredentials:true}).then((res)=>{
              console.log('added to wish list');
              toast.success("Property Added to wishList");
              setIsActive(true)
             return  router.refresh();
            }).catch((e)=>{
             return  toast.error("Failed to Add property to WishList!");
            })
          }

         // for deleting wishlist
          if(active){
            console.log('inside active')
            const res=Api.delete(`/property/v1/wishList/${id}`,{withCredentials:true}).then((res)=>{
              console.log("Wishlist removed");
              toast.success("Property Removed from Favourites!!");
              setIsActive(false)
              return router.refresh();
            }).catch((e)=>{
              return toast.error("Failed to Remove Property From Favourites!!")
            })
          }
            

        }}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            className={isActive ? 'h-7  w-7 fill-themeColor stroke-gray-100': 'h-7 w-7 fill-gray-400  stroke-gray-100  transition-all  hover:stroke-themeColor'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
    )
}


import Link from "next/link"
import { forwardRef} from "react"

import useModal from "../../store/useModal"
import Api from "../../api/client/axios"
import { toast } from "react-hot-toast"
import { useRouter} from 'next/navigation'


const btnstyle="w-full text-sm text-gray-600 text-left p-2 px-3 rounded-md hover:bg-hoverColor"

 interface NavModal{
    authState:boolean
    is_Admin:boolean
   
 }

 type Ref = HTMLDivElement;

 const NavModal=forwardRef<Ref,NavModal>((props,ref)=>{
    const modal=useModal();
    const router=useRouter()

  if(!props.authState){
    return(
        <div ref={ref} className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2   ">
            <button className={`${btnstyle} font-semibold`} 
            onClick={(e)=>{
                e.preventDefault();
               modal.onOpen('login')
                
            }}
            >Log in</button>


            <button onClick={(e)=>{
                e.preventDefault();
                modal.onOpen('signup')
                
                
            }}  className={btnstyle}>Sign Up</button>
            <hr />

            <button onClick={(e)=>modal.onOpen('login')} className={btnstyle}>Post Property</button>
           

            

        </div>
    )
  }  

  return(
    <div  ref={ref} className="absolute top-[68px]  w-60  border-2 border-gray-100 overflow-hidden translate-x-[-69%] p-1 shadow-xl bg-white  rounded-lg z-50  flex flex-col gap-2    ">
    {!props.is_Admin&&<div className="flex flex-col gap-2 ">
       <Link  href='/Home/Account/trips' className={`${btnstyle} font-semibold`}>Trips</Link>
        <Link  href='/Home/Account/favourites' className={`${btnstyle} font-semibold`}>WishLists</Link>
        <Link  href='/Home/Account/reservations' className={`${btnstyle} font-semibold`}>Reservations</Link>
        
       
        
        <hr />
        <Link  href='/Home/Account/listings' className={`${btnstyle}`}>Manage Listings</Link>
       </div>}

        <Link  href={`${props.is_Admin?"/Admin":"/Home/Account"}`} className={`${btnstyle} ${props.is_Admin?'font-semibold':''}`}>{props.is_Admin?"Dashboard":"Account"}</Link>
        <hr />
        <button className={btnstyle}  onClick={(e)=>{
                e.preventDefault();
                const res= Api.delete('/auth/v1/logout',{withCredentials:true}).then((res)=>{
                    toast.success("User logged Out");
                    router.refresh()
                    return router.push('/Home')
                    
                }).catch((e)=>{
                  toast.success("User logged Out");
                  router.refresh()
                  return router.push('/Home')
                  
                })
                
            }}>Log Out</button>
    </div>
)

})



NavModal.displayName = 'NavModal';

export default NavModal;
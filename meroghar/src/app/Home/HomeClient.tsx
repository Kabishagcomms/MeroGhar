'use client'

import { SessionUser, sessionData } from "../../api/server/auth"
import Card from "../../components/card/card"
import { Property, wishlist } from "../../interface/response"
interface HomeProps{
    properties:Partial<Property>[],
    wishList?:wishlist,
    userData:SessionUser
}
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export function HomeClient({properties,wishList,userData}:HomeProps){
    const router=useRouter();

    useEffect(()=>{
        return router.refresh();
    },[])


    if(wishList){
        return (
            <main className="w-full    ">
    
            
            {/* for Property Viwed By users */}
            <div className="w-[95%]  mx-auto">
          
           {properties.length==0&& <h1 className="text-center my-5 text-lg  md:text-xl font-semibold ">No Properties To Display!</h1>}
    
            
            <div className="w-full my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5"   >
                {
                    properties.map((property,index)=>{
                        //check if the wishlist matched the proeprty id
                        const inwish=wishList!.wishList.some((data)=>data._id==property._id)
                        return(
                            <Card use="card" key={index} wish={inwish} data={property} user={userData.is_Admin&&'admin'||userData.docId==property.userId&&'owner'||userData.docId==''&&''||'user'} />
                        )
                    })
                }
            </div>
           
           
               {properties.length>=8&& <button className="mx-auto bg-themeColor text-sm text-white font-semibold hover:bg-mainColor px-3 py-2 border border-white transition-all rounded-lg hover:scale-105 ">LoadMore</button>}
            </div>
    
           
        </main> )
    }

    return (
        <main className="w-full    ">

        
        {/* for Property Viwed By users */}
        <div className="w-[95%]  mx-auto">
      
       {properties.length==0&& <h1 className="text-center my-5 text-lg  md:text-xl font-semibold ">No Properties To Display!</h1>}

        
        <div className="w-full my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5"   >
            {
                properties.map((property,index)=>{
                   
                    return(
                        <Card use="card" key={index} wish={false} data={property} user={userData.is_Admin?'admin':''} />
                    )
                })
            }
        </div>
       
       
           {properties.length>=8&& <button className="mx-auto bg-themeColor text-sm text-white font-semibold hover:bg-mainColor px-3 py-2 border border-white transition-all rounded-lg hover:scale-105 ">LoadMore</button>}
        </div>

       
    </main> 
    )

    
}
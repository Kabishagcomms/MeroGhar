import { api } from "@/api/api";
import { wishlist } from "../../../interface/response";
import { getAccessToken } from "../auth";

export async function getFavourites(page:number,limit:number):Promise<wishlist>{
    try{
      
       
        const res = await fetch(
            `${api}/property/v1/wishList?page=${page}&limit=${limit}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
          if(!res.success) throw new Error(`${res.error}`)
        
        console.log("my properties",res);
        return res.wishList;
  
        
    }catch(e){
       throw e;
  }}
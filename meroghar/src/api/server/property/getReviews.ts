import { api } from "@/api/api";
import { IReview } from "../../../interface/response";
import { getAccessToken } from "../auth";

export async function getReviews(propertyId:string,page:number,limit:number):Promise<IReview[]>{
    try{
        const res = await fetch(
            `${api}/property/v1/review/${propertyId}/?page=${page}&limit=${limit}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: { cookie: getAccessToken()},
              cache:'no-store'
            }
          ).then(res=>res.json())
    
          if(!res.success) throw new Error(`${res.error}`)
        
        console.log("my properties",res);
        return res.reviews;
  
        
    }catch(e){
       throw e;
  }}
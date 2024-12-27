// this file is going to contain api call for property 

import { PropertyForm } from "../../interface/form";
import Api from "./axios";



export async function PostPropery(body:Partial<PropertyForm>):Promise<boolean>{
    try{
    const res=await Api.post("/property/v1/createProperty",body,{withCredentials:true});
    if(!res.data.success){
     throw new Error(res.data.error)
    }
    return true;
    }catch(e){
        console.log(e)
        throw e;
    }
    
}


export async function UpdatePropery(id:string,body:Partial<PropertyForm>):Promise<boolean>{
    try{
    const res=await Api.patch(`/property/v1/updateProperty/${id}`,body,{withCredentials:true});
    if(!res.data.success){
     throw new Error(res.data.error)
    }
    return true;
    }catch(e){
        console.log(e)
        throw e;
    }
    
}







interface Booking{
    startDate:Date,
    endDate:Date,
    guest:string
}

export async function PostBooking(propertyId:string,body:Booking):Promise<boolean>{
    try{
    const res=await Api.post(`/property/v1/booking/${propertyId}`,body,{withCredentials:true});
    if(!res.data.success){
     throw new Error(res.data.error)
    }
    return true;
    }catch(e){
        console.log(e)
        throw e;
    }
    
}
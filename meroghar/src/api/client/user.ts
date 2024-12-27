import { KycData, PropertyForm } from "../../interface/form";
import Api from "./axios";



export async function checkPhone(PhoneNumber:string):Promise<boolean>{
    try{
    const res=await Api.get(`/user/v1/verifyPhone/${PhoneNumber}`,{withCredentials:true});
    // if phone number exist return false
    if(!res.data.success){
     return false
    }
    return true;
    }catch(e){
        console.log(e)
        return false;
    }
    
}

export async function postPhone(PhoneNumber:string):Promise<boolean>{
    try{
    const res=await Api.post(`/user/v1/verifyPhone/${PhoneNumber}`,{},{withCredentials:true});
    // if phone number exist return false
    if(!res.data.success){
     return false
    }
    return true;
    }catch(e){
        console.log(e)
        return false
    }
    
}


export async function postKyc(kycData:KycData):Promise<boolean>{
    try{
        const res=await Api.post(`/user/v1/postKyc`,kycData,{withCredentials:true});
        if(!res.data.success){
            return false
           }
           return true;
    }catch(e){
        console.log(e)
        return false;
    }
}








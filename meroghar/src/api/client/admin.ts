import Api from "./axios"


export async  function verifyKyc(id:string,body:{isVerified:boolean,message?:string}){
    try{
        const res=await Api.patch(`/admin/v1/kycRequests/${id}`,body,{withCredentials:true})
        if(!res.data.success) return false;
        return true
    }catch(e){
        console.log(e)
        return false
    }
}

export async  function verifyProperty(id:string,body:{isVerified:boolean,message?:string}){
    try{
        const res=await Api.patch(`/admin/v1/propertyRequests/${id}`,body,{withCredentials:true})
        if(!res.data.success) return false;
        return true
    }catch(e){
        console.log(e)
        return false
    }
}
import { api } from "@/api/api";
import { Property } from "../../../interface/response";
import { getAccessToken } from "../auth";

export interface dashData{
    totalUsers:number,
    activeUsers:number,
    totalProperties:number,
    activeProperties:number
    totalBookings:number,
    activeBookings:number
    properties:Partial<Property>[]
}


export default async function getDashBoardData():Promise<dashData>{
    try{
        const res=await fetch(`${api}/admin/v1/dashBoardData`,{
            method:"GET",
            credentials:'include',
            headers:{cookie:getAccessToken()},
            cache:'no-store'
        }).then((res)=>res.json())

        if(!res.success) throw new Error(res.error)

        return res.data;


    }catch(e){
        throw e;
    }
}
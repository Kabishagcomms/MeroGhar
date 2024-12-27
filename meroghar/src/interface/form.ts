


export interface PropertyForm{
    name:string,
   
      country:string,
      state:string,
      city:string,
     
    discription:string,
    propertyType:string,
    rules:string,
    rate:number,
    images:any[],
    amenities:string[]
}


export interface KycData{
  kycInfo:{
  firstName:string,
  lastName:string,
  gender:string,
  email?:string,
 
    country:string,
    state:string,
    city:string,

  img?:{
      imgId:string,
      imgUrl:string
  },
  phoneNumber?:string
  }
  
}
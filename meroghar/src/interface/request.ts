
export interface LoginRegisterInput {
    userId: string
    password: string
}



export interface Images{
  imgId:string,
  imgUrl:string
}
export interface PostProperty{
    name:string,
    city:string,
    area:string,
    discription:string,
    property_type:string,
    rule:string,
    price:number,
    images:Images[],
    amenities:string[]
}



'use client'

import Link from 'next/link'

import Carousel from '../../../../components/carousel'
import { BookProperty } from '../../../../components/listing/BookProperty'
import Review from '../../../../components/review'
import Wish from '../../../../components/Svg/wishSvg'
import { FetchedMe, IReview, Property } from '../../../../interface/response'
import { Reservation } from './page'
import {BsHouses} from 'react-icons/bs'
import {HiOutlineMapPin} from 'react-icons/hi2'
import * as _ from 'lodash'
import { AiFillStar } from 'react-icons/ai'

import ReviewInput from '../../../../components/reviewInput'


interface RoomProps {
  propertyData: Partial<Property>

  //check if in wishlist
  inWishList: boolean
  // user is owener tennnat admin 
  user: string
  //onlydates
  reservations: Reservation[],

  //some features are not availabel for admin
  is_Admin:boolean,

  //listout reviews and also check if current user provided review for edit and delete
  reviews:IReview[],

  //current user is passed to check if user has provided review then allow to edit 
  currentUser?:string
}

export function RoomClient({
  propertyData,
  inWishList,
  user,
  reservations,
  is_Admin,
  reviews,currentUser
}: RoomProps) {
  const {
    images,
    name,
    rate,
    country,
    state,
    city,
    avgRating,
    ratingCount,
    userId,
    propertyType,
    discription,
    amenities,
    rules,
    isBanned,
    isVerified,
  
    _id
  } = propertyData
 
    console.log("userType",user)
  return (
    <main className="w-full bg-white ">
    
      <div className=" mx-auto w-[95%] md:w-[82%]">
        <div>
          <h3 className=" text-lg md:text-xl font-semibold text-left ">
            {_.startCase(name)}
          </h3>

          <div className="w-full  flex gap-y-2 flex-wrap justify-between">
            <div className=" flex items-center justify-around gap-3 ">
              


              <p
                
                className="block text-sm font-semibold underline"
              >
                {country},{state},{city}
              </p>
            </div>

            <div className="flex items-center gap-x-3">
             {!(is_Admin||user=='owner')&&<button className="flex items-center gap-1 rounded-lg p-1 hover:bg-hoverColor ">
                <Wish active={inWishList} id={_id!} user={user}/>
                <span className="text-sm font-semibold underline">Save</span>
              </button>}

              {user == 'owner' && (
                <Link href="/Home/Account/listings" className="text-sm font-semibold underline">
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>

        <Carousel images={images!}/>

        {/* property Information  */}

        <div className="my-6 flex flex-col items-center justify-between md:flex-row md:items-start">
          <div className="w-[95%] md:w-[60%] ">

            <div className=" flex  my-3 w-full items-center justify-between">
              <div>
                <h3 className=" text-md md:text-lg font-semibold">
                  {_.startCase(propertyType)} Hosted by {(userId as FetchedMe).userName}
                </h3>
              </div>

              <Link href={`/Home/user/${(userId as FetchedMe)._id}`} className="block" target='_blank'>
                <img
                src={`${(userId as FetchedMe).profileImg!.imgUrl}`}
                  alt="userProfile"
                  className="h-14 w-14 rounded-full  border-2 border-gray-300"
                />
              </Link>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* basic property Information  */}
            <div>
              <div className="flex items-center gap-x-3 ">
                <BsHouses className="h-7 w-7" />
                <p className="text-sm font-semibold">{_.startCase(propertyType)}</p>
              </div>

              <div className="my-4 flex items-center gap-x-3">
                <HiOutlineMapPin className="h-7 w-7" />
                <p className="text-sm font-semibold">
                  {country},{state},{city}
                </p>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />
            {/* discription */}
            <div>
              <h3 className=" text-md md:text-lg font-semibold text-black">
                Description
              </h3>
              <p className="text-sm sm:text-md mt-2 text-gray-800 ">{_.startCase(discription)}</p>
            </div>
            <hr className="my-8 border-gray-200" />

            {/* Amenities */}
            <div>
              <h3 className="text-md md:text-lg font-semibold text-black">What this place offers</h3>
              <div className="my-1">
                {amenities!.map((items,index) => {
                  return (
                    <div key={index} className="my-1 flex items-center gap-x-4">
                      <p className='text-sm sm:text-md text-gray-700 '>{items}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="my-8 border-gray-200" />
            {/* for Rules */}
            <div>
              <h3 className="text-lg font-semibold text-black">Rules</h3>
              <p className="text-sm sm:text-md text-gray-700">{_.startCase(rules!)}</p>
            </div>
          </div>

          {/* interactive component for contacting owner */}

         {!is_Admin&&!isBanned!.status!&&isVerified!.status&&<BookProperty reservations={reservations} user={user} propertyData={propertyData} is_Admin={is_Admin} />}
        </div>

        <hr className="my-8 border-gray-200" /> 

        <div className='text-lg pb-3 border-b-2 border-gray-700 w-fit sm:text-xl font-semibold my-10'>
          Review Section
        </div>
          

        {/* only render if user is tennant  */}
        {user=='tennant'&&<div>
        
          <ReviewInput rating={1} Review='' userData={(userId as FetchedMe)} propertyId={_id!} edit={false}/>
          
        </div>}
       

        
        {/* REViews Section */}
        <div>
          {/* header block */}
          <div className="my-8 flex items-center gap-x-1">
           <AiFillStar className='h-5 w-5 mt-[6px]' />
            <p className="text-lg sm:text-xl font-semibold">{avgRating}</p>/
            <p className=" text-lg sm:text-xl font-semibold">{ratingCount} reviews</p>
          </div>

         
          {/* grid block simply map reviews*/}
          <div className="grid-1 grid w-full gap-7 md:grid-cols-2 ">
            {reviews.map((data,index) => {
              return (
                <Review  key={index} reviewData={data} currentUser={currentUser!} />
              )
            })}
          </div>
        </div>
      </div>


     
    </main>
  )
}

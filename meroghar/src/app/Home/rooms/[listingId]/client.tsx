'use client'

import Link from 'next/link'

import Carousel from '../../../../components/carousel'
import { BookProperty } from '../../../../components/listing/BookProperty'
import Review from '../../../../components/review'
import Wish from '../../../../components/Svg/wishSvg'
import { FetchedMe, IReview, Property } from '../../../../interface/response'
import { Reservation } from './page'
import { BsHouses } from 'react-icons/bs'
import { HiOutlineMapPin } from 'react-icons/hi2'
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
  reservations: Reservation[]

  //some features are not availabel for admin
  is_Admin: boolean

  //listout reviews and also check if current user provided review for edit and delete
  reviews: IReview[]

  //current user is passed to check if user has provided review then allow to edit
  currentUser?: string
}

export function RoomClient({
  propertyData,
  inWishList,
  user,
  reservations,
  is_Admin,
  reviews,
  currentUser,
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

    _id,
  } = propertyData

  console.log('userType', user)
  return (
    <main className="w-full bg-white ">
      <div className=" mx-auto w-[95%] md:w-[82%]">
        <div>
          <div className="flex  w-full flex-wrap justify-between gap-y-2">
            <div className="flex items-center gap-x-3">
              {!(is_Admin || user == 'owner') && (
                <button className="flex items-center gap-1 rounded-lg p-1 hover:bg-hoverColor ">
                  <Wish active={inWishList} id={_id!} user={user} />
                  <span className="text-sm font-semibold underline">Save</span>
                </button>
              )}

              {user == 'owner' && (
                <Link
                  href="/Home/Account/listings"
                  className="text-sm font-semibold underline hover:text-[#59b077]"
                >
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>

        <Carousel images={images!} />

        {/* property Information  */}

        <div className="my-6 flex flex-col items-center justify-between md:flex-row md:items-start">
          <div className="w-[95%] md:w-[60%] ">
            <div className=" my-3  flex w-full items-center justify-between">
              <div>
                <h3 className=" text-left text-lg font-semibold md:text-5xl ">
                  {_.startCase(name)}
                </h3>

                <h3 className=" text-md ml-2 mt-6 font-semibold md:text-base">
                  {_.startCase(propertyType)} Hosted by{' '}
                  {(userId as FetchedMe).userName}
                </h3>
              </div>

              <Link
                href={`/Home/user/${(userId as FetchedMe)._id}`}
                className="block"
                target="_blank"
              >
                <img
                  src={`${(userId as FetchedMe).profileImg!.imgUrl}`}
                  alt="userProfile"
                  className="border-gray-300 h-14 w-14  rounded-full border-2"
                />
              </Link>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* basic property Information  */}
            <div>
              <div className="flex items-center gap-x-3 ">
                <BsHouses className="h-7 w-7 text-[#59b077] " />
                <p className="text-sm font-semibold">
                  {_.startCase(propertyType)}
                </p>
              </div>

              <div className="my-4 flex items-center gap-x-3">
                <HiOutlineMapPin className="h-7 w-7" />
                <p className="text-sm font-semibold">
                  {country},{state},{city}
                </p>
              </div>
            </div>

            <hr className="border-gray-200 my-8" />
            {/* discription */}
            <div>
              <h3 className=" text-md font-semibold text-black md:text-lg">
                Description
              </h3>
              <p className="sm:text-md text-gray-800 mt-2 text-sm ">
                {_.startCase(discription)}
              </p>
            </div>
            <hr className="border-gray-200 my-8" />

            {/* Amenities */}
            <div>
              <h3 className="text-md font-semibold text-black md:text-lg">
                What this place offers
              </h3>
              <div className="my-1">
                {amenities!.map((items, index) => {
                  return (
                    <div key={index} className="my-1 flex items-center gap-x-4">
                      <p className="sm:text-md text-gray-700 text-sm ">
                        {items}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="border-gray-200 my-8" />
            {/* for Rules */}
            <div>
              <h3 className="text-lg font-semibold text-black">Rules</h3>
              <p className="sm:text-md text-gray-700 text-sm">
                {_.startCase(rules!)}
              </p>
            </div>
          </div>

          {/* interactive component for contacting owner */}

          {!is_Admin && !isBanned!.status! && isVerified!.status && (
            <BookProperty
              reservations={reservations}
              user={user}
              propertyData={propertyData}
              is_Admin={is_Admin}
            />
          )}
        </div>

        <hr className="border-gray-200 my-8" />

        <div className="border-gray-700 my-10 w-fit border-b-2 pb-3 text-lg font-semibold sm:text-xl">
          Review Section
        </div>

        {/* only render if user is tennant  */}
        {user == 'tennant' && (
          <div>
            <ReviewInput
              rating={1}
              Review=""
              userData={userId as FetchedMe}
              propertyId={_id!}
              edit={false}
            />
          </div>
        )}

        {/* REViews Section */}
        <div>
          {/* header block */}
          <div className="my-8 flex items-center gap-x-1">
            <AiFillStar className="mt-[6px] h-5 w-5" />
            <p className="text-lg font-semibold sm:text-xl">{avgRating}</p>/
            <p className=" text-lg font-semibold sm:text-xl">
              {ratingCount} reviews
            </p>
          </div>

          {/* grid block simply map reviews*/}
          <div className="grid-1 grid w-full gap-7 md:grid-cols-2 ">
            {reviews.map((data, index) => {
              return (
                <Review
                  key={index}
                  reviewData={data}
                  currentUser={currentUser!}
                />
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

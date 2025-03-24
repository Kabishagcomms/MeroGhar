import React from 'react';
import { MapPin, Star, Calendar, Users, ArrowLeft } from 'lucide-react';
import { FetchedMe, IReview, Property } from '../interface/response';
import { BsHouses } from 'react-icons/bs';
import { HiOutlineMapPin } from 'react-icons/hi2';
import * as _ from 'lodash';
import { AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import { Reservation } from '@/app/[locale]/Home/rooms/[listingId]/page';
import { BookProperty } from '@/components/listing/BookProperty';
import Review from '../components/review';
import ReviewInput from '../components/reviewInput';
import Wish from '../components/Svg/wishSvg';

interface RoomDetailsProps {
  propertyData: Partial<Property>;
  inWishList: boolean;
  user: string;
  reservations: Reservation[];
  is_Admin: boolean;
  reviews: IReview[];
  currentUser?: string;
}

function RoomDetails({
  propertyData,
  inWishList,
  user,
  reservations,
  is_Admin,
  reviews,
  currentUser,
}: RoomDetailsProps) {
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
  } = propertyData;

  const handleWishlistToggle = () => {

    console.log(reviews)
    // Implement your wishlist toggle functionality here
    console.log('Toggle wishlist for property:', _id);
  };

  return (
    <div className="min-h-screen bg-[#EAE7DD]">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button and actions */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-xl p-4 shadow-sm">
          <Link
            href="/Home"
            className="flex items-center text-[#99775C] hover:text-[#886a52] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to listings
          </Link>
          
          
          {!(is_Admin || user == 'owner') && (
            <div className="flex items-center">
              <div className="relative mr-2">
                <Wish active={inWishList} id={_id!} user={user} />
              </div>
              <span className="text-sm font-semibold text-[#99775C]">Save</span>
            </div>
          )}

          {user == 'owner' && (
            <Link
              href="/Home/Account/listings"
              className="text-sm font-semibold text-[#99775C] hover:text-[#886a52] transition-colors"
            >
              Edit
            </Link>
          )}
        </div>

        {/* Room title and rating */}
        <div className="mb-6 bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-[#99775C] mb-2">{_.startCase(name)}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-[#99775C] mr-2" />
              <span className="text-[#886a52]">{_.startCase(`${city}, ${state}, ${country}`)}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-[#99775C] mr-1" />
              <span className="font-semibold text-[#99775C]">{avgRating}</span>
              <span className="text-[#886a52] ml-1">({ratingCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {images && images.length > 1 ? (
            <>
              <div className="h-96 rounded-lg overflow-hidden">
                <img src={images[0]?.imgUrl || '/placeholder.jpg'} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {images.slice(1, 5).map((image, index) => (
                  <div key={index} className="h-44 rounded-lg overflow-hidden">
                    <img src={image.imgUrl} alt={`Room detail ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Single image takes full width
            <div className="col-span-full h-96 rounded-lg overflow-hidden">
              <img 
                src={images?.[0]?.imgUrl || '/placeholder.jpg'} 
                alt={name} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Host information */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#99775C]">
                 Hosted by {(userId as FetchedMe)?.userName}
                </h2>
              </div>
              <Link
                href={`/Home/user/${(userId as FetchedMe)?._id}`}
                className="block"
                target="_blank"
              >
                <img
                  src={(userId as FetchedMe)?.profileImg?.imgUrl || 'https://res.cloudinary.com/dnimr7n8t/image/upload/v1742368515/68747470733a2f2f6176617461722e6972616e2e6c696172612e72756e2f7075626c69632f626f793f757365726e616d653d53636f7474_s9ae24.png'}
                  alt="Host profile"
                  className="h-14 w-14 rounded-full border-2 border-gray-300 object-cover"
                />
              </Link>
            </div>

            {/* Property type & location */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center gap-x-3 mb-4">
                <BsHouses className="h-7 w-7 text-[#99775C]" />
                <div>
                  <h3 className="font-semibold text-[#99775C]">{_.startCase(propertyType)}</h3>
                </div>
              </div>

              <div className="flex items-center gap-x-3">
                <HiOutlineMapPin className="h-7 w-7 text-[#99775C]" />
                <div>
                  <h3 className="font-semibold text-[#99775C]">
                    {_.startCase(`${city}, ${state}, ${country}`)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-[#99775C]">Description</h2>
              <p className="text-[#886a52] leading-relaxed">
                {_.startCase(discription)}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-[#99775C]">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {amenities?.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-[#EAE7DD] rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-[#99775C] mr-3"></div>
                    <span className="text-[#886a52]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-[#99775C]">House Rules</h2>
              <p className="text-[#886a52] leading-relaxed">
                {_.startCase(rules)}
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-x-2 mb-6">
                <AiFillStar className="h-5 w-5 text-[#99775C]" />
                <h2 className="text-xl font-semibold text-[#99775C]">
                  {avgRating} · {ratingCount} reviews
                </h2>
              </div>

              {/* Review Input - only for tenants */}
              {user == 'tennant' && (
                <div className="mb-8 p-5 bg-[#EAE7DD]/30 rounded-lg border border-[#99775C]/10">
                  <h3 className="text-lg font-semibold mb-4 text-[#99775C]">Share your experience</h3>
                  <ReviewInput
                    rating={1}
                    Review=""
                    userData={userId as FetchedMe}
                    propertyId={_id!}
                    edit={false}
                  />
                </div>
              )}

              {/* Reviews Grid */}
              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((data, index) => (
                    <Review
                      key={index}
                      reviewData={data}
                      currentUser={currentUser!}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#99775C]/70 text-lg">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {!is_Admin && !isBanned?.status && isVerified?.status && (
                <div className="bg-white rounded-xl shadow-lg ">
                  <BookProperty
                    reservations={reservations}
                    user={user}
                    propertyData={propertyData}
                    is_Admin={is_Admin}
                  />
                </div>
              )}
              
              {(is_Admin || isBanned?.status || !isVerified?.status) && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-center">
                    {isBanned?.status && (
                      <div className="text-red-500 font-semibold">
                        This property has been banned
                      </div>
                    )}
                    {!isVerified?.status && (
                      <div className="text-amber-500 font-semibold">
                        This property is awaiting verification
                      </div>
                    )}
                    {is_Admin && (
                      <div className="text-gray-500 font-semibold">
                        Admin view - booking disabled
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
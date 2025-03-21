'use client'

import RoomDetails from '../../../../components/RoomDetails'
import { FetchedMe, IReview, Property } from '../../../../interface/response'
import { Reservation } from './page'

interface RoomProps {
  propertyData: Partial<Property>
  inWishList: boolean
  user: string
  reservations: Reservation[]
  is_Admin: boolean
  reviews: IReview[]
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
  console.log('userType', user)
  
  return (
    <RoomDetails
      propertyData={propertyData}
      inWishList={inWishList}
      user={user}
      reservations={reservations}
      is_Admin={is_Admin}
      reviews={reviews}
      currentUser={currentUser}
    />
  )
}

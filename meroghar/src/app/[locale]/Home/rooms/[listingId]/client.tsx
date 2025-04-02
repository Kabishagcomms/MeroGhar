'use client'

import RoomDetails from '../../../../../components/RoomDetails'
import { FetchedMe, IReview, Property } from '../../../../../interface/response'
import { Reservation } from './page'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is empty string or null/undefined
    if (user === '' || user === null || user === undefined) {
      // Use replace instead of push for a cleaner navigation experience
      router.replace('/en/Home')
    }
  }, [user, router])
  
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

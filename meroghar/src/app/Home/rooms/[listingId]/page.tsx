import getReservations, { getPropertyBookings } from '../../../../api/server/property/getReservation'

import { getPropertyById } from '../../../../api/server/property/getProperty'
import ClientComp from '../../../../components/clientComp'
import { RoomClient } from './client'
import { checkSession } from '../../../../api/server/auth'
import { getReviews } from '../../../../api/server/property/getReviews'

// type Params = {
//   params: {
//     listingId: string
//   }
// }
// { params: { listingId }}:params

interface IParams {
  listingId: string
}

export interface Reservation {
  startDate: Date
  endDate: Date
}

export default async function Room({ params }: { params: IParams }) {
  // since get resevation can be used for multiple cases betrter to pass entire param obj

  const propertyData =getPropertyById(params.listingId)
  const reservationsData =getPropertyBookings(params.listingId)
  const reviewsList=getReviews(params.listingId,1,10);
  
  const {session,userData}=await checkSession()

  //here user represents who uare tennant owner admin or non logged in 
  const [{ property, user, inWishList }, reservations,reviews] = await Promise.all([
    propertyData,
    reservationsData,
    reviewsList
  ])

  const updatedReservations = reservations.map(reservation => {
    const newStartDate = new Date(reservation.startDate!)
    newStartDate.setDate(newStartDate.getDate() - 1)
    return {
      startDate: newStartDate,
      endDate: reservation.endDate!
    }
  })

  console.log('property population',property)
  
  return (
    <ClientComp>
      <RoomClient
        reservations={updatedReservations!}
        propertyData={property}
        user={user}
        is_Admin={userData.is_Admin}
        inWishList={inWishList}
        reviews={reviews}
        currentUser={userData.docId}
      />
    </ClientComp>
  )
}

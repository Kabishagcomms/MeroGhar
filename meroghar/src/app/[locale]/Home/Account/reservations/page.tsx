import { checkSession } from "../../../../api/server/auth";
import { getOnBookings } from "../../../../api/server/property/getReservation";
import { NoAuth } from "../../../../components/NoAuth";
import ClientComp from "../../../../components/clientComp";
import Link from 'next/link'
import TripBookingClient from "../../../../components/listing/TripsReservationClient";

export default async function MyTrips() {

  const { session, userData } = await checkSession();
  const trips = await getOnBookings(1, 10);
  console.log("reservations", trips);

  if (!session) {
    return (
      <main className="w-full">
        <div className=" mx-auto w-[95%]">
          <ClientComp>
            <NoAuth Header="My Trips" header2="Log in to view your Trips/Reservations" header3="You can  View,Edit,Cancel your Trips once Logged In" />
          </ClientComp>
        </div>
      </main>
    )
  }

  //fetch trip/bookings made by me
  return (
    <main className="w-full bg-white ">
      <div className="mx-auto w-[95%] ">

        {trips.length === 0 ? (
          <main className="flex min-h-[70vh] w-full flex-col items-center justify-center rounded-xl bg-[#EAE7DD]/10 px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="mb-4 text-3xl font-semibold text-[#99775C]">
                Your Reservations
              </h1>
              <div className="mx-auto mb-8 h-[2px] w-24 bg-[#99775C]/20"></div>
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-[#99775C]/80">
                  No Reservations Yet
                </h2>
                <p className="text-[#99775C]/60">
                  Ready to start your journey? Find your perfect stay today.
                </p>
                <div className="pt-4">
                  <Link
                    href={'/Home/listings'}
                    className="inline-flex items-center rounded-lg border-2 border-[#99775C] bg-white px-6 py-3 text-sm font-medium text-[#99775C] transition-all hover:bg-[#99775C] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#99775C]/50 active:scale-[0.98]"
                  >
                    Browse Listings
                  </Link>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <ClientComp>
            <TripBookingClient trips={false} bookings={trips} />
          </ClientComp>
        )}

      </div>
    </main>
  )
}

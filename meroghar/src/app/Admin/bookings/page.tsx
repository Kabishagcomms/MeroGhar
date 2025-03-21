import { getAllBookings } from "../../../api/server/property/getReservation";
import AdminTable from "../../../components/admin/table";
import ClientComp from "../../../components/clientComp";

export default async function Bookings(){

    const bookings=await getAllBookings(1,10)


    if(bookings.length===0){
        return(
         
            <h1 className="text-lg md:text-xl font-semibold md:font-bold text-center"> No Bookings To Display !!!</h1>
          
        )
      }

    return(
        <main className="w-[98%] mx-auto">

           <h1 className="text-left mb-6 text-lg md:text-2xl font-semibold md:font-bold ">Total Bookings !!!</h1>



            <ClientComp>
                <AdminTable use="booking" bookings={bookings} />
            </ClientComp>
          
        </main>
      
    )
}
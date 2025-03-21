
'use client'

import Link from 'next/link'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

import { IBooking, } from '../../interface/response'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import {

  AiOutlineCheckCircle,
} from 'react-icons/ai'

import {BiCalendarEdit} from 'react-icons/bi'
import {BsHouseCheckFill,BsFillHouseSlashFill} from 'react-icons/bs'
import moment from 'moment'
import Api from '../../api/client/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useConfirm from '../../store/useConfirm'
import useModal from '../../store/useModal'
import * as lodash from 'lodash'
import Image from 'next/image'




interface Props{
trips:boolean
is_Admin?:boolean
bookings:Partial<IBooking>[]
  
}

export default function TripBookingClient({trips,bookings,is_Admin}:Props) {
  const router=useRouter();
  const confirm=useConfirm();
  const modal=useModal()
  console.log(trips);


      const onCheckIn=(id:string)=>{
        //first set content for the store
        confirm.onContent({
          header:"Are you Sure You want to Check In!",
          onAction:()=>{ Api.patch(`/property/v1/booking/confirmCheckIn/${id}`,{},{withCredentials:true}).then(()=>{
            console.log("user checkedIn");
            toast.success("Checked In Successfully!");
             modal.onClose()
            return router.refresh();
          })
          .catch(()=>{
            toast.error("Check In Failed/Check In repeated!!");
            return router.refresh();
          })},
          actionBtn:"Check In"
        });

        //now open confirm modal 
        modal.onOpen("confirm");
      }



      const onCheckOut=(id:string)=>{
        confirm.onContent({
          header:"Are you Sure You want to Check Out!",
          actionBtn:"Check Out",
          onAction:()=>{ Api.patch(`/property/v1/booking/confirmCheckOut/${id}`,{},{withCredentials:true}).then(()=>{
            console.log("user checkedIn");
            toast.success("Checked Out Successfully!");
            modal.onClose()
            return router.refresh();
          })
          .catch(()=>{
            toast.error("Check In Failed!!");
            return router.refresh();
          })},
         
        });

        //now open confirm modal 
        modal.onOpen("confirm");
      }



      //booking id
      const cancelBooking=(id:string)=>{
        //set content for modal
        confirm.onContent({
          header:"Are you Sure to Cancel Booking!",
          actionBtn:"Delete",
          onAction:()=>{
            Api.patch(`property/v1/booking/cancelBooking/${id}`,{},{withCredentials:true}).then((res)=>{
               toast.success("booking cancelled Successfully");
               router.refresh();
               return modal.onClose()
            }).catch((e)=>{
              console.log(e);
              return toast.error("failed to cancel booking")
            })
          }
        })

       return  modal.onOpen('confirm');
      }
      
    


  return (
    <main className="bg-[#EAE7DD]/10 min-h-screen pb-8">
      {!is_Admin! && (
        <div className="bg-white shadow-sm border-b border-[#99775C]/10 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-[#99775C]">
              {trips ? "My Trips" : "Property Reservations"}
            </h1>
          </div>
        </div>
      )}

      {bookings!.length! > 0 && (
        <div className="max-w-7xl mx-auto mt-8 px-4">
          <div className="bg-white rounded-xl shadow-sm border border-[#99775C]/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#EAE7DD]/50">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    S.No
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    Property
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    Status
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    {trips ? 'Host' : "Tenant"}
                  </th>
                  {is_Admin && (
                    <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                      Host
                    </th>
                  )}
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    StartDate
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    EndDate
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                    Amount
                  </th>
                  {!is_Admin && (
                    <th className="p-4 text-left text-xs font-medium text-[#99775C] uppercase">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#99775C]/10">
                {bookings.map((data, index) => (
                  <tr key={index} className="hover:bg-[#EAE7DD]/20 transition-colors">
                    <td className="p-4 text-[#99775C] font-medium">
                      {index + 1}.
                    </td>
                    
                    <td className="p-4">
                      <Link 
                        href={`/Home/rooms/${data.propertyId?._id}`} 
                        target='_space'
                        className="flex items-center gap-4 group"
                      >
                        <div className="relative h-16 w-20 rounded-lg overflow-hidden">
                          <Image 
                            alt='property image' 
                            height={64} 
                            width={80} 
                            className="object-cover group-hover:scale-110 transition-transform" 
                            src={data.propertyId!.images![0]!.imgUrl} 
                          />
                        </div>
                        <span className="font-medium text-[#99775C] group-hover:text-[#886a52]">
                          {data.propertyId?.name}
                        </span>
                      </Link>
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        data.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        data.status === 'Booked' ? 'bg-[#EAE7DD] text-[#99775C]' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {data.status}
                      </span>
                    </td>

                    {!trips && (
                      <td className="p-4">
                        <Link 
                          href={`/Home/user/${data.userId?._id}`} 
                          className="text-[#99775C] hover:text-[#886a52] font-medium hover:underline"
                        >
                          {lodash.capitalize(data.userId?.userName)}
                        </Link>
                      </td>
                    )}

                    {(is_Admin || trips) && (
                      <td className="p-4">
                        <Link 
                          href={`/Home/user/${data.hostId?._id}`} 
                          className="text-[#99775C] hover:text-[#886a52] font-medium hover:underline"
                        >
                          {lodash.capitalize(data.hostId?.userName)}
                        </Link>
                      </td>
                    )}

                    <td className="p-4 text-[#99775C]">
                      {moment(data.startDate).format('DD/MM/YY')}
                    </td>
                    <td className="p-4 text-[#99775C]">
                      {moment(data.endDate).format('DD/MM/YY')}
                    </td>
                    <td className="p-4 font-medium text-[#99775C]">
                      ${data.paymentId?.totalAmount}
                    </td>

                    {!is_Admin && (
                      <td className="p-4">
                        {/* For owner */}
                        {(!trips && !data.checkInStatus) && data.status === 'Booked' && (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#99775C] rounded-lg hover:bg-[#886a52] transition-colors"
                              onClick={() => onCheckIn(data._id!)}
                            >
                              <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
                              Check In
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                              onClick={() => cancelBooking(data._id!)}
                            >
                              <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
                              Cancel
                            </button>
                          </div>
                        )}

                        {/* For tenant */}
                        {trips && (!data.checkInStatus) && data.status === 'Booked' && (
                          <div>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                              onClick={() => cancelBooking(data._id!)}
                            >
                              <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
                              Cancel Booking
                            </button>
                          </div>
                        )}

                        {/* Check out button */}
                        {(!trips && !data.checkOutStatus && data.checkInStatus) && data.status === 'Booked' && (
                          <div>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#99775C] rounded-lg hover:bg-[#886a52] transition-colors"
                              onClick={() => onCheckOut(data._id!)}
                            >
                              <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
                              Check Out
                            </button>
                          </div>
                        )}

                        {/* Status indicators */}
                        {data.checkInStatus && (
                          <div className="flex items-center gap-x-2 text-[#99775C]">
                            {(trips ? data.checkInStatus : data.checkOutStatus) && (
                              <BsHouseCheckFill className="h-5 w-5 text-[#99775C]" />
                            )}
                            {data.status === 'Completed' && (
                              <p className="font-medium">Booking Completed!</p>
                            )}
                            {(trips && data.checkInStatus && data.status !== "Completed") && (
                              <p className="font-medium">Checked In!</p>
                            )}
                          </div>
                        )}

                        {(data.status === 'tenantCancelled' || data.status === "ownerCancelled") && (
                          <div className="flex items-center gap-x-2 text-red-600">
                            <BsFillHouseSlashFill className="h-5 w-5" />
                            <p className="font-medium">Booking Cancelled!</p>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          {bookings!.length! > 5 && (
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#99775C] rounded-lg hover:bg-[#886a52] transition-colors"
              >
                <AiOutlineLeft className="mr-2 h-4 w-4" />
                Previous
              </Link>
              <Link
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#99775C] rounded-lg hover:bg-[#886a52] transition-colors"
              >
                Next
                <AiOutlineRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  )
}


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
    <main>
     {!is_Admin!&&<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:mt-1.5">
        <div className="mb-1 mx-auto w-full sm:w-[98%]">
          <div className="mb-4">

            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
             {trips? "Trips !":"Reservations on Your Properties !"}
            </h1>
          </div>
         
        </div>
      </div>}
     

        {bookings!.length!>0&&<div>
          {/* only available for kyc verified user */}
          <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                   {trips? 'Host':"Tennant"}
                  </th> 
                 {is_Admin&&<th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                   Host
                  </th>}

                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    StartDate
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    EndDate
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Amount
                  </th>
                  
                 {!is_Admin&&<th
                    scope="col"
                    className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </th>}
                </tr>
              </thead>

        {
          bookings.map((data,index)=>{
            console.log(data);
            return(
              <tbody key={index} className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">

              <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                  {index+1}.
                </td>
                
                <Link href={`/Home/rooms/${data.propertyId?._id}` } target='_space' ><td className="mr-12 flex items-center space-x-3 whitespace-nowrap p-4">
                  <Image alt='propertyimage' height={64} width={80} className=" rounded-lg" src={data.propertyId!.images![0]!.imgUrl} />

                  <div className="text-base font-semibold  text-gray-800 dark:text-white">
                    {data.propertyId?.name}
                  </div>
                </td></Link>

                <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
                  {data.status}
                </td>

             
           { !trips&& <td className="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-900 dark:text-gray-400 xl:max-w-xs">
              <Link href={`/Home/user/${data.userId?._id}`} className='underline'>  {lodash.capitalize(data.userId?.userName)}</Link>  
               </td>}

{            is_Admin||trips&& <td className="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-900 dark:text-gray-400 xl:max-w-xs">
              <Link href={`/Home/user/${data.hostId?._id}`} className='underline'>  {lodash.capitalize(data.hostId?.userName)}</Link>  
               </td>}

                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                  {moment(data.startDate).format('DD/MM/YY')}
                </td>
                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                {moment(data.endDate).format('DD/MM/YY')}
                </td>
                <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                 $ {data.paymentId?.totalAmount}
                </td>

              
             {!is_Admin&& <td>
                 {/* for owner */}
                 {(!trips&&!data.checkInStatus)&&data.status=='Booked'&&<td className="space-x-2 whitespace-nowrap p-4">
                  <button
                    type="button"
                    
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                   onClick={(e)=>onCheckIn(data._id!)}>
                    <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
                    CheckIn
                  </button>

                  <button
                    type="button"
                    className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                   
                    onClick={(e)=>cancelBooking(data._id!)} >
                    <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
                    Cancel Booking
                  </button>
                </td>}

                {/* for tennant */}
                {trips&&(!data.checkInStatus)&&data.status=='Booked'&&<td className="space-x-2 whitespace-nowrap p-4">
                {/* <button
                  type="button"
                  className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                  
        

                >
                  <BiCalendarEdit className="mr-2 h-5 w-5" />
                  Edit
                </button> */}

                  <button
                    type="button"
                    className="ml-2 inline-flex  items-center rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                  
                    onClick={(e)=>cancelBooking(data._id!)}>
                    <RiDeleteBin6Fill className="mr-2 h-5 w-5" />
                    Cancel Booking
                  </button>
                </td>}


                {(!trips&&!data.checkOutStatus&&data.checkInStatus)&&data.status=='Booked'&&<td className="space-x-2 whitespace-nowrap p-4">
                  <button
                    type="button"
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
                    
                    onClick={(e)=>onCheckOut(data._id!)}>
                    <AiOutlineCheckCircle className="mr-2 h-5 w-5" />
                    CheckOut
                  </button>

                
                </td>}

              {/* for both client and owner */}
              {data.checkInStatus&&<td className="space-x-2 text-sm font-semibold text-gray-600 whitespace-nowrap p-4">
                
                <div className='flex items-center gap-x-2'>
                {(trips?data.checkInStatus:data.checkOutStatus)&&<BsHouseCheckFill className='h-6 w-6' />}
               {data.status=='Completed'&&<p>  Booking Completed!   </p>}
               {(trips&&data.checkInStatus&&data.status!="Completed")&& <p>  Checked In!   </p>}
                </div>
              
                
                </td>}

              {
                (data.status=='tenantCancelled'||data.status=="ownerCancelled")&&<td className="space-x-2 text-sm font-semibold text-gray-600 whitespace-nowrap p-4">
                
                  <div className='flex items-center gap-x-2'>
                   <BsFillHouseSlashFill className='h-6 w-6' />
                  <p>Booking Cancelled!   </p>
               
                  </div>
                
                  
                  </td>
                }

              </td>}
               

              </tr>
            </tbody>
            )
          })
        }

            </table>
          </div>
        </div>
      </div>
    </div>
        
            
         

                
             
            
         </div>}
       


      

      {/* paginatioon footer */}
      {bookings!.length!>5&&<div className="sticky bottom-0 right-0 w-full  border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="#"
            className="bg-themeColor hover:bg-mainColor focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
          >
          <AiOutlineLeft className="mr-1 -ml-1 h-3 w-3 " strokeWidth='3'/>
            Previous
          </Link>
          <Link
            href="#"
            className="bg-themeColor hover:bg-mainColor focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4"
          >
            
            Next
            <AiOutlineRight className="ml-1 -mr-1 h-3 w-3 " strokeWidth='3'/>
          </Link>
        </div>
      </div>}

    </main>
  )
}

'use client'



import Link from 'next/link';
import {BsFillHouseCheckFill} from 'react-icons/bs'
import { dashData } from "../../api/server/property/getdashboard";
import Image from 'next/image';

export default  function DashClient({totalBookings,totalProperties,totalUsers,activeBookings,activeProperties,activeUsers,properties}:dashData){

    return(
        <main className="w-[98%] mx-auto">
           
        <h1 className="text-lg mb-5 font-semiBold  sm:text-2xl sm:font-bold ">Data OverView</h1>
        

        <div className="w-[95%] mx-auto gap-x-5 flex items-center justify-center overflow-x-auto">

         <div className="border-2 w-[200px] h-[170px] border-gray-300 shadow-lg p-4 rounded-lg">
          <Image alt='hello' width={56} height={56} src='./user.png' className='h-14 w-14 mx-auto ' />

          <div className='my-2  flex items-center'>
          <p className='font-semibold text-md'>Total Users:</p>
          <p className='font-semibold text-sm'>{totalUsers}</p>
          </div>
          
          <div className='my-1 flex items-center'>
          <p className='font-semibold text-md'>Active Users:</p>
          <p className='font-semibold text-sm'>{activeUsers}</p>
          </div>

         </div>

          <div className="border-2 w-[200px] h-[170px] border-gray-300 shadow-lg p-4 rounded-lg">
          <Image alt='hello' width={56} height={56} src='./airbnb.png' className='h-14 w-14 mx-auto ' />

          <div className='my-2 flex items-center'>
          <p className='font-semibold text-md'>Total Properties:</p>
          <p className='font-semibold text-sm'>{totalProperties}</p>
          </div>

          <div className='my-2 flex items-center'>
          <p className='font-semibold text-md'>Active Properties:</p>
          <p className='font-semibold text-sm'>{activeProperties}</p>
          </div>
          
          
          </div>


          <div className="border-2 w-[200px] h-[170px] border-gray-300 shadow-lg p-4 rounded-lg">
          <BsFillHouseCheckFill className='h-14 w-14 mx-auto ' />

          <div className='my-2 flex items-center'>
          <p className='font-semibold text-md'>Total Bookings:</p>
          <p className='font-semibold text-sm'>{totalBookings}</p>
          </div>
          
          <div className='my-1 flex items-center'>
          <p className='font-semibold text-md'>Active Bookings:</p>
          <p className='font-semibold text-sm'>{activeBookings}</p>
          </div>
          
          </div>


         </div>

       <h2 className='text-xl font-bold my-8 '>Most Popular Properties rightNow!</h2>

      {/* table to display property */}

 <div className="flex flex-col w-[98%] mx-auto">
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
                 PropertyName
                 
               </th>

               <th
                 scope="col"
                 className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
               >
                 Host
               </th>
               <th
                 scope="col"
                 className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
               >
               Tennant Count
              
               </th>
               <th
                 scope="col"
                 className="p-4 text-left text-xs font-bold uppercase text-gray-500 dark:text-gray-400"
               >
                 Rate/Night
               </th>
             </tr>
           </thead>

     {
     
      properties!.map((data,index)=>{
         console.log(data);
         return(
           <tbody key={index} className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
           <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">

           <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
               {index+1}.
             </td>
             
             <Link href={`/Home/rooms/${data._id}` } target='_space' ><td className="mr-12 flex items-center space-x-3 whitespace-nowrap p-4">
               <img className="h-16 w-20 rounded-lg" src={data.images![0]!.imgUrl} />

               <div className="text-base font-semibold  text-gray-800 dark:text-white">
                 {data.name}
               </div>
             </td></Link>


             <td className="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-900 dark:text-gray-400 xl:max-w-xs">
           <Link target='_space' href={`/Home/user/${typeof(data.userId)=='object'?data!.userId._id!:data._id}`} className='underline'>{typeof(data.userId)=='object'?data!.userId.userName!:'Host'}</Link>  
            </td>

             <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
              {data.ratingCount}
             </td>

             <td className="max-w-sm overflow-hidden truncate p-4 text-base font-semibold text-gray-900 dark:text-gray-400 xl:max-w-xs">
              ${data.rate}
             </td>

          
          

            

           
            
             

             
           </tr>
         </tbody>
         )
       })

     }
     </table>
 </div >
 </div >
 </div >
 </div >



     </main>
    )
}






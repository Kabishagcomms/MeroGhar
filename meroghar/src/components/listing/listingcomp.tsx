
'use client'

import Link from 'next/link'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import PostPropertyForm from '../postproperty'
import { Property } from '../../interface/response'
import Card from '../card/card'
import useRandom from '../../store/randomStore'
import { toast } from 'react-hot-toast'


interface Props{
  is_Admin:boolean,
  properties:Partial<Property>[]
  kycVerified?:boolean
}

export default function ListingComp({is_Admin,properties,kycVerified}:Props) {

    const list=useRandom();

    


  return (
    <main>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:mt-1.5">
        <div className="mb-1 mx-auto w-full sm:w-[98%]">
          <div className="mb-4">

            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Listings
            </h1>
          </div>
          <div className="block items-center justify-between dark:divide-gray-700 sm:flex md:divide-x md:divide-gray-100">

            {is_Admin&&<div className="mb-4 flex items-center sm:mb-0">
              <form className="sm:pr-3">
                <label className="sr-only">Search</label>
                <div className="relative mt-1 w-48 sm:w-64 xl:w-96">
                  <input
                    type="text"
                  
                  
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Search for Property"
                  />
                </div>
              </form>
            </div>}

      {/* only for normal user */}
            {!is_Admin&&<button
              className="flex items-center focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-themeColor px-5 py-2.5 text-sm font-medium text-white hover:bg-mainColor focus:outline-none focus:ring-4"
              type="button"
              onClick={(e)=>{
                e.preventDefault();

                if(!kycVerified){
                  return toast.error("Please Verify Kyc to List Property!")
                }


                list.onList("list")
              }}
              >
             
              List Property
            </button>}


          </div>
        </div>
      </div>
     

     {properties!.length!>0&&<div>
               {/* only available for kyc verified user */}
        
          

           {list.listProperty=='close'&&<div className="w-[96%] p-2 mx-auto my-2 grid gap-x-2 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
             
    
               
                {
                    properties!.map((property,index)=>{
                      
                        return(
                            // property card
                            <Card use={is_Admin? 'adminlisting':'userlisting'} data={property} key={index} index={index}/>
                    
                            
                        )
                    })
                }

                
              </div>
            }
     </div>}
       


          {/* property lisiting form  */}
        {
          list.listProperty=='list'&&<PostPropertyForm isUpdate={false}/>
        }
         {
          list.listProperty=='edit'&&<PostPropertyForm isUpdate={true} propertyData={properties[list.propIndex]}/>
        }
     

      {/* paginatioon footer */}
      {list.listProperty=='close'&&properties?.length!>5&&<div className="sticky bottom-0 right-0 w-full  border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
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

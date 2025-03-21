import { getKycs } from '../../../api/server/user/getUser'
import ClientComp from '../../../components/clientComp'
import UserCard from '../../../components/card/userCard'
import Link from 'next/link'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { FaClipboardCheck } from 'react-icons/fa'

export default async function KycRequest() {
  const KycRequests = await getKycs(1, 10)

  if (KycRequests.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#EAE7DD]">
        <div className="mb-6 rounded-full bg-[#99775C] p-6 text-white">
          <FaClipboardCheck className="h-16 w-16" />
        </div>
        <h1 className="mb-3 text-center text-2xl font-bold text-[#99775C]">
          No KYC Requests To Verify
        </h1>
        <p className="text-center text-[#886a52]">
          All verification requests have been processed. Check back later for new requests.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-'>
      <div className="mx-auto mb-1  w-[96%] p-2">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            User KYC Requests
          </h1>
        </div>

        {/* <div className="block items-center justify-between dark:divide-gray-700 sm:flex md:divide-x md:divide-gray-100">
            <div className="mb-4 flex items-center sm:mb-0">
              <form className="sm:pr-3">
                <label className="sr-only">Search</label>
                <div className="relative mt-1 w-48 sm:w-64 xl:w-96">
                  <input
                    type="text"
                  
                  
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm"
                    placeholder="Search for User"
                  />
                </div>
              </form>
            </div>

          </div> */}
      </div>

      <hr className="my-5 border-gray-400" />

      <div className="mx-auto my-2 grid  grid-cols-1 gap-y-4 sm:grid-cols-2  lg:grid-cols-3  ">
        <ClientComp>
          {KycRequests.map((data, index) => {
            return <UserCard userData={data} key={index} />
          })}
        </ClientComp>
      </div>

      {KycRequests.length > 10 && (
        <div className="relative bottom-0 right-0 w-full border-t  border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between md:sticky">
          <div className="flex items-center space-x-3 sm:px-4">
            <Link
              href="#"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
            >
              <AiOutlineLeft className="mr-1 -ml-1 h-3 w-3 " strokeWidth="3" />
              Previous
            </Link>
            <Link
              href="#"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex flex-1 items-center justify-center rounded-lg bg-themeColor px-3 py-2 text-center text-sm font-medium text-white hover:bg-mainColor focus:ring-4"
            >
              Next
              <AiOutlineRight className="ml-1 -mr-1 h-3 w-3 " strokeWidth="3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

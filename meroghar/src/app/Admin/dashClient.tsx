'use client'

import Link from 'next/link'
import { BsFillHouseCheckFill } from 'react-icons/bs'
import { dashData } from '../../api/server/property/getdashboard'
import Image from 'next/image'

export default function DashClient({
  totalUsers,

  activeUsers,
}: dashData) {
  return (
    <main className="mx-auto w-[98%]">
      <h1 className="font-semiBold mb-5 text-lg  sm:text-2xl sm:font-bold ">
        Data OverView
      </h1>

      <div className="mx-auto flex w-[95%] items-center justify-center gap-x-5 overflow-x-auto">
        <div className="h-[170px] w-[200px] rounded-lg border-2 border-gray-300 p-4 shadow-lg">
          <Image
            alt="hello"
            width={56}
            height={56}
            src="/user.png"
            className="mx-auto h-14 w-14 "
          />

          <div className="my-2  flex items-center">
            <p className="text-md font-semibold">Total Users:</p>
            <p className="text-sm font-semibold">{totalUsers}</p>
          </div>

          <div className="my-1 flex items-center">
            <p className="text-md font-semibold">Active Users:</p>
            <p className="text-sm font-semibold">{activeUsers}</p>
          </div>
        </div>

        <div className="h-[170px] w-[200px] rounded-lg border-2 border-gray-300 p-4 shadow-lg">
          <Image
            alt="hello"
            width={56}
            height={56}
            src="/airbnb.png"
            className="mx-auto h-14 w-14 "
          />
        </div>

        <div className="h-[170px] w-[200px] rounded-lg border-2 border-gray-300 p-4 shadow-lg">
          <BsFillHouseCheckFill className="mx-auto h-14 w-14 " />
        </div>
      </div>

      <h2 className="my-8 text-xl font-bold ">
        Most Popular Properties rightNow!
      </h2>

      {/* table to display property */}

      <div className="mx-auto flex w-[98%] flex-col">
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

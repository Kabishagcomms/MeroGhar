'use client'

import Datepicker from 'react-tailwindcss-datepicker'
import { useState } from 'react'
import Link from 'next/link'
import { ErrorText } from '../random'

import moment from 'moment'
import useModal from '../../store/useModal'
import { Property } from '../../interface/response'
import useBookingStore from '../../store/bookingStore'
import { AiFillStar } from 'react-icons/ai'
import { toast } from 'react-hot-toast'

interface Booking {
  reservations: {
    startDate: Date
    endDate: Date
  }[]
  user: string
  propertyData: Partial<Property>
  is_Admin: boolean
}

export function BookProperty({ reservations, user, propertyData }: Booking) {
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  console.log(reservations)

  const [guest, setguest] = useState(0)

  const modal = useModal()
  const bookingStore = useBookingStore()

  const currentDate = new Date()
  console.log(date.startDate, currentDate)
  const maxDate = new Date()
  maxDate.setFullYear(currentDate.getFullYear() + 1) // set the year to be one year after the current date
  maxDate.setMonth(currentDate.getMonth()) // set the month to be the same as the current date
  maxDate.setDate(currentDate.getDate()) // set the day to be the same as the current date

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue)

    setdate(newValue)
  }

  const onReserve = async (e: any) => {
    const momentStartDate = moment(date.startDate)
    const momentEndDate = moment(date.endDate)

    e.preventDefault()

    if (user == '') {
      return modal.onOpen('login')
    }

    if (user == 'owner') {
      return toast.error('Owner cant book Owned Property')
    }

    //date setup is checked on client side
    if (date.startDate == null || date.endDate == null || guest <= 0) {
      return bookingStore.setError(true)
    }

    if (moment(date.startDate).isSame(moment(), 'day')) {
      console.log('same date')
      return bookingStore.setError(true)
    }

    //now check for bookingg date to not overlap or something
    const checkOverLap = reservations.some(({ startDate, endDate }) => {
      const startDateI = moment(startDate)
      const endDateI = moment(endDate)

      return (
        (startDateI.isSameOrBefore(momentEndDate) &&
          endDateI.isSameOrAfter(momentEndDate)) ||
        (startDateI.isSameOrBefore(momentStartDate) &&
          endDateI.isSameOrAfter(momentStartDate)) ||
        (startDateI.isSameOrAfter(momentStartDate) &&
          endDateI.isSameOrBefore(momentEndDate))
      )
    })

    if (checkOverLap) return bookingStore.setError(true)

    //set eroro false
    bookingStore.setError(false)

    bookingStore.setPropertyData(propertyData)
    bookingStore.setbookingInfo({
      guest: guest,
      startDate: date.startDate,
      endDate: date.endDate,
    })
    modal.onOpen('booking')

    // // send post request
  }

  return (
    <main className="my-4 w-[95%] rounded-xl border-2 bg-white  shadow-none md:w-[35%] md:border-gray-200  md:shadow-lg ">
      <div className="my-5 flex items-center justify-around">
        <p className="text-lg font-semibold">
          ${propertyData.rate}
          <span className=" text-sm font-semibold">/Night</span>
        </p>
        <div className="flex  gap-x-[2px] ">
          <AiFillStar className="h-5 w-5" />
          <span className="">{propertyData.avgRating}</span>
        </div>
      </div>

      <div className="mx-auto my-2 w-[90%] rounded-lg ">
        <div className="my-2 rounded-lg border-2 border-gray-300">
          {/* an array with start and end date for the dates to be disabled is passed */}
          <Datepicker
            value={date}
            onChange={handleValueChange}
            minDate={currentDate}
            maxDate={maxDate}
            disabledDates={reservations}
          />
        </div>

        <form>
          <input
            type="number"
            className="text-md my-1 h-11 w-full  rounded-md border-2 border-gray-300 p-2 text-sm text-gray-700 hover:bg-hoverColor"
            placeholder="No of Guest"
            value={guest}
            onChange={(e) => {
              console.log(guest)
              setguest(parseInt(e.target.value))
            }}
          />

          {bookingStore.error && (
            <div className="my-2 ">
              <ErrorText text="Please Enter Valid Date/guest for Booking" />
            </div>
          )}

          <hr className=" my-2 border-gray-300" />
          {/* pass form value from rouet then use catch all routes to access query values */}
          <button
            type="submit"
            className="my-4 block w-full rounded-lg bg-themeColor p-3 px-3 text-center text-sm font-semibold text-white hover:bg-mainColor"
            onClick={onReserve}
          >
            reserve
          </button>

          {/* <Link href="#" className='w-full block my-3 text-center  text-sm underline'>Contact Host</Link> */}
        </form>
      </div>

      {/* Review Section */}
    </main>
  )
}

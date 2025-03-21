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

  const [guest, setguest] = useState(0)

  const modal = useModal()
  const bookingStore = useBookingStore()

  const currentDate = new Date()
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

    //set error false
    bookingStore.setError(false)

    bookingStore.setPropertyData(propertyData)
    bookingStore.setbookingInfo({
      guest: guest,
      startDate: date.startDate,
      endDate: date.endDate,
    })
    modal.onOpen('booking')
  }

  return (
    <main className="my-4 w-[95%] rounded-xl bg-white p-6 shadow-lg md:w-[100%]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-[#99775C]">
            ${propertyData.rate}
            <span className="ml-1 text-lg font-medium text-[#886a52]">
              per night
            </span>
          </p>
        </div>
        <div className="flex items-center gap-x-1">
          <AiFillStar className="h-5 w-5 text-[#99775C]" />
          <span className="text-lg font-medium text-[#99775C]">{propertyData.avgRating}</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="rounded-lg border-2 border-[#99775C]/20 transition-colors focus-within:border-[#99775C]/50">
          <Datepicker
            value={date}
            onChange={handleValueChange}
            minDate={currentDate}
            maxDate={maxDate}
            disabledDates={reservations}
            inputClassName="w-full p-3 text-[#99775C] placeholder:text-[#99775C]/60 focus:outline-none"
            containerClassName="relative w-full"
            toggleClassName="absolute right-0 h-full px-3 text-[#99775C] focus:outline-none"
            displayFormat="MMM DD, YYYY"
          
            primaryColor="amber"
            useRange={true}
            readOnly={true}
          />
        </div>

        <form className="space-y-4">
          <input
            type="number"
            className="w-full rounded-lg border-2 border-[#99775C]/20 p-3 text-[#99775C] placeholder:text-[#99775C]/60 focus:border-[#99775C]/50 focus:outline-none transition-colors"
            placeholder="Number of Guests"
            value={guest}
            onChange={(e) => {
              setguest(parseInt(e.target.value) || 0)
            }}
          />

          {bookingStore.error && (
            <div className="my-2">
              <ErrorText text="Please Enter Valid Date/guest for Booking" />
            </div>
          )}

          <hr className="border-[#99775C]/20" />

          <button
            type="submit"
            className="w-full rounded-lg bg-[#99775C] p-4 text-center text-sm font-semibold text-white transition-all hover:bg-[#886a52] hover:shadow-lg active:scale-[0.98]"
            onClick={onReserve}
          >
            Reserve
          </button>
        </form>
      </div>
    </main>
  )
}
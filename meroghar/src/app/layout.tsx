import '../styles/globals.css'

import { Inter } from 'next/font/google'
import {Playfair_Display, Rubik} from 'next/font/google'
import ClientComp from '../components/clientComp'

import { LoginModal } from '../components/modals/loginModal'
import { RegisterModal } from '../components/modals/registerModal'

import ToasterProvider from '../components/toast/toastProvider'
import { ConfirmModal } from '../components/modals/confirmModal'

import ResetPassword from '../components/modals/forgotpassword'
import { SearchModal } from '../components/modals/searchModal'
import { BookingModal } from '@/components/modals/bookingBillModal'

const playfair = Playfair_Display({
  subsets: ['cyrillic'],
  variable: '--font-playfair', // Add this line
})

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik', // Add this line
})  

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Add this line
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className={`flex flex-col bg-mainColor ${playfair.variable} ${inter.variable} ${rubik.variable}`}>
        <ClientComp>
          {/* this component are kind of hassle donot repeat them on other layouts since they have shared state 
          overlapping will cause modal to bug and close  on click since they are in root layout they are rendered through out the 
          application */}
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <ConfirmModal />
          <BookingModal/>
          <ResetPassword />
          <SearchModal />
        </ClientComp>

        {/* this children represents each page component  that is rendered */}
        {children}
      </body>
    </html>
  )
}

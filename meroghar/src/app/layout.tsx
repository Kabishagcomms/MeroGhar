import '../styles/globals.css'

import { Inter } from 'next/font/google'
import {Playfair_Display, Rubik} from 'next/font/google'
import ClientComp from '../components/clientComp'
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { LoginModal } from '../components/modals/loginModal'
import { RegisterModal } from '../components/modals/registerModal'

import ToasterProvider from '../components/toast/toastProvider'
import { ConfirmModal } from '../components/modals/confirmModal'

import ResetPassword from '../components/modals/forgotpassword'
import { SearchModal } from '../components/modals/searchModal'
import { BookingModal } from '@/components/modals/bookingBillModal'

const playfair = Playfair_Display({
  subsets: ['cyrillic'],
  variable: '--font-playfair',
})

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})  

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head />
      <body className={`flex flex-col bg-mainColor ${playfair.variable} ${inter.variable} ${rubik.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientComp>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <ConfirmModal />
            <BookingModal/>
            <ResetPassword />
            <SearchModal />
          </ClientComp>

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

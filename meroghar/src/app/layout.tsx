
import '../styles/globals.css'




import { Nunito } from 'next/font/google'
import ClientComp from '../components/clientComp';

import { LoginModal } from '../components/modals/loginModal';
import { RegisterModal } from '../components/modals/registerModal';

import ToasterProvider from '../components/toast/toastProvider';
import { ConfirmModal } from '../components/modals/confirmModal';
import { MessageModal } from '../components/modals/rejectReportModal';
import { BookingModal } from '../components/modals/bookingBillModal';
import ResetPassword from '../components/modals/forgotpassword';
import { SearchModal } from '../components/modals/searchModal';


const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({children}: {children: React.ReactNode}) {



  return (
    //toggle dark mode by getting dark mode from 
    <html>
      <head />
      {/* body sets the root layout for entire application */}
      <body className={` flex flex-col ${font.className}`}>
        

        {/* conditionally render navbar  */}
      
        <ClientComp>

          {/* this component are kind of hassle donot repeat them on other layouts since they have shared state 
          overlapping will cause modal to bug and close  on click since they are in root layout they are rendered through out the 
          application */}
          <ToasterProvider />
           <LoginModal />
           <RegisterModal />
           <ConfirmModal />
           <MessageModal />
           <BookingModal />
           <ResetPassword />
           <SearchModal/>
          
           
        </ClientComp>
        
        {/* this children represents each page component  that is rendered */}
        {children}
      
        
        
      </body>
    </html>
  )
}

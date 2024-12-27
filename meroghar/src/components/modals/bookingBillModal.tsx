'use client'


// used for both booking modal and also renders the bill once the booking and payment is completed

import useBookingStore from "../../store/bookingStore"
import useModal from "../../store/useModal"
import {AiFillStar} from 'react-icons/ai'
const style1='bg-white border-2 border-gray-200 flex  flex-col items-center justify-center rounded-lg shadow-lg md:w-[540px]'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useRouter } from "next/navigation"
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import dayjs  from "dayjs"
import Modal from "./modal"
import Invoice from "../listing/invoiceUI"
import {createRef, useState} from 'react'
import { toast } from "react-hot-toast"
import Image from "next/image"




export function BookingModal(){
    const bookingModal=useModal()
    const billref=createRef<HTMLDivElement>()
  
    const bookingStore=useBookingStore()
    const router=useRouter();
    const {images,propertyType,name,avgRating,userId,rate,_id}=bookingStore.propertyData;
    const {startDate,endDate}=bookingStore.bookingInfo

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const totalDays = end.diff(start,'day') + 1;
    const  basePrice=totalDays*rate!
    const taxPrice=(basePrice/100)*18;
    const totalCost=basePrice+taxPrice;
   
   

    

   
    
    const handleDownloadPdf = async () => {
        const element = billref.current;
        const canvas = await html2canvas(element!);
        const data = canvas.toDataURL('image/png');
        console.log('data',data);
        //now uplaod 
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
        
        const billpdf= pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('bill.pdf');
       
        bookingModal.onClose()
        bookingStore.setError(false)
        return router.refresh();
      };
    


    if(bookingModal.isOpen=='booking'){
        return(
            <>
        <Modal isOpen={bookingModal.isOpen}>
        <main className={style1}>

           <div className={`w-full p-4  `}>
                <div className="flex flex-col items-center justify-center" >
                    <div className="w-[95%] sm:m-0 h-40 sm:h-48  rounded-lg">
                    <Image fill src={images![0]!.imgUrl} alt="propertyImage"  />
                    </div>
                    
                    
                    <div className="p-2 flex flex-row items-center w-full justify-around " >

                    <div >
                    <p className="text-sm text-gray-600">{propertyType!}</p>
                    <h1 className="text-md font-semibold">{name!}</h1>
                    </div>
                  
                    <div className="">
                    <p  className="text-sm flex items-center gap-x-1"><AiFillStar/>{avgRating}</p>
                    <p className='mt-2 text-sm font-semibold'>{ typeof userId === 'string' ? userId : userId?.userName}</p>
                    </div>
                   
                    </div>
                </div>
                

                <hr  className="border-gray-300 my-3"/>

                <div>
                <h2 className="text-lg font-semibold mb-3">Your Total</h2>
                <div className="flex justify-between items-center">
                    <p className='text-md'>{totalDays} nights</p>
                    <p className="font-semiBold"> ${basePrice}</p>
                </div>

                <div className="my-3 flex justify-between items-center">
                <p className='text-md'>Taxes/Charge</p>
                <p className="font-semiBold">${taxPrice}</p>
                </div>

                </div>

                <hr  className="border-gray-300 my-3"/>
                
                <div className="flex justify-between items-center">
                    <p className='font-semibold text-md'>Total $</p>
                    <p className="font-semiBold text-md"> ${totalCost}</p>
                </div>

                <div className="mt-5">
               
                <PayPalScriptProvider options={{ "client-id":'AQBVm0xUYDKKY-d-Jf3xUHDSgGpDkw2N_9cvIXP_ty4BQZ_GWJidp5fWZRDgwjlSDsYq1Wv9SBJnbK-d'}}>
                <PayPalButtons style={{ layout: "horizontal",color:"blue" ,height:40,tagline:false }} createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value:totalCost.toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions:any) => {
                    return actions.order.capture().then(async(details:any) => {
                        const name = details.payer.name.given_name;
                        
                        console.log(details)
                        // account used for paying the bill 
                        bookingStore.setBillData({
                            payerId:details.payer.payer_id,
                            paymentId:details.id
                        });
                        
                        toast.success("Payment Successfull");
                        
                        router.refresh();
                       return  bookingModal.onOpen('bill')
                        
                    });
                }} />
        </PayPalScriptProvider>

      
                </div>
           </div>
           </main>
           </Modal>
           </>
        )
        
    }

    if(bookingModal.isOpen=='bill'){
        return(
            <>
            <Modal isOpen={bookingModal.isOpen}>
            <main className={style1}>
                        {/* this div is for bill download after the payment and booking has been finalized */}
                        <div className={`w-full`}>
                <div ref={billref}  >
                <Invoice payerId={bookingStore.billData.payerId} paymentId={bookingStore.billData.paymentId} rate={rate!} nights={totalDays} tennantId="Random1" propertyName={name!} hostId={ typeof userId === 'string' ? userId : userId!.userName!} initialPrice={basePrice} taxAndServiceChargePrice={taxPrice} totalPrice={totalCost} />
                </div>
            
                <div className="w-[95%] ml-2 p-2 flex items-center justify-between">
                <button type="button" className=" text-md font-semibold underline"  onClick={(e)=>{
                    e.preventDefault();
                    bookingModal.onClose();
                  
                    bookingStore.setError(false)
                    return router.refresh();
                }}>
                cancel
                </button>
                <button type="button" className=" text-md font-semibold underline"  onClick={handleDownloadPdf}>
                Download Bill
                </button>
                </div>
               
    
                </div>
               </main>
               </Modal>
               </>
        )
       
    }

    return null;
      
            

            
  
  
}

'use client'

import {createRef, useEffect} from 'react'
import html2canvas from 'html2canvas';
import Image from 'next/image'
import useBookingStore from '../../store/bookingStore';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast'
import Api from '../../api/client/axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';

interface InvoiceProps {
    tennantId: string;
    //can be anyone jsut saved for reference
    nights:number,
    rate:number,
    hostId: string;
    propertyName: string;
    initialPrice: number;
    taxAndServiceChargePrice: number;
    totalPrice: number;
    paymentId:string
    payerId:string,
}
const Invoice =(props:InvoiceProps) => {

  const { 
    tennantId, 
    propertyName,
    hostId,
    initialPrice,
    taxAndServiceChargePrice,
    totalPrice,
    paymentId,
    nights,
    rate,
    payerId
  } = props;

    const bookingStore=useBookingStore()
    const billref=createRef<HTMLDivElement>()

    const router=useRouter();


  useEffect(()=>{
    const action=async()=>{
          // pdf bill to body
                       
    const element = billref.current;
    const canvas = await html2canvas(element!);
    const data = canvas.toDataURL('image/png');
    console.log('data',data);
   
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
    (imgProperties.height * pdfWidth) / imgProperties.width;
    
    const billpdf= pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const pdfData = billpdf.output('dataurlstring');

    const body={
    startDate:bookingStore.bookingInfo.startDate,
    endDate:bookingStore.bookingInfo.endDate,
    guest:bookingStore.bookingInfo.guest,
    payerId,
    paymentId,
    initialAmount:initialPrice,
    serviceCharge:taxAndServiceChargePrice,
    totalAmount:totalPrice,
    stay:nights,
    bill:pdfData
    }
    

    console.log("bookingBody",body)
    try{
    const newBooking=await Api.post(`/property/v1/booking/${bookingStore.propertyData._id}`,body,{withCredentials:true});
    if(!newBooking.data.success){
        toast.error(newBooking.data.error)
        return bookingStore.setError(true)
    }
    
    toast.success(`Booking successfull/bill has been sent`);
    return router.refresh();
  
    
    }catch(e:any){
    
    toast.error("This booking conflicts with an existing booking/Error occurred.");
    router.refresh();
    return bookingStore.setError(true)
    }
    }

    action();
  },[])


  return (
    
    

<div ref={billref} className="bg-white  w-full max-w-4xl mx-auto rounded-lg  ">
  <div className="bg-gray-100 p-4 border-b border-gray-200">
    <div className="w-full flex items-center justify-between">
      <div className="w-full">
        <div className='flex items-center justify-between'>
          <Image src="/airbnb.png" alt="airbnb" height={56} width={56}  />
        <div className='flex items-center gap-x-1'>
        <div className="font-semibold ">Date:</div>
        <div>{moment().format("MM/DD/YYYY")}</div>
      </div>
        </div>

        <h6 className="font-semibold mt-2 text-gray-600 mb-1">Invoice #:{paymentId}</h6>
      </div>
      
    </div>
  </div>
  <div className="p-4">
    <div className="w-full">
    <div className='my-2'>
        <div className="font-semibold ">Billed From:</div>
        <div>{hostId}</div>
      </div>

      <div className='my-2'>
        <div className="font-semibold ">Billed to:</div>
        <div>{tennantId}</div>
        
      </div>

     

     

    <div className='my-3 flex items-center gap-x-5'>
    <div >
        <div className="font-semibold ">startDate:</div>
        <div>{moment(bookingStore.bookingInfo.startDate).format('MM/DD/YYYY')}</div>
      </div>


      <div>
        <div className="font-semibold ">endDate:</div>
        <div>{moment(bookingStore.bookingInfo.endDate).format('MM/DD/YYYY')}</div>
      </div>
    </div>
     

    </div>

    <table className=" mt-8 w-full">
      <thead className='w-full'>
        <tr className='w-full border-b p-2  border-gray-200 flex items-center justify-around'>
          <th className="">Nights</th>
          <th className="">Property Id</th>
          <th className="">Rate</th>
          <th className="">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr className=' w-full  p-2  flex items-center justify-around'>
          <td className="text-center">{nights}</td>
          <td>{propertyName}</td>
          <td className="">${rate}/Night</td>
          <td className="">${initialPrice}</td>
        </tr>
      </tbody>
    </table>

    <hr className='border my-5 border-gray-200' />
    <div className='w-full my-4 '>

    <div className='flex my-2 items-center gap-x-3'>
      <h2 className='font-bold text-md '>SubTotal:</h2>
      <p>${initialPrice}</p>
    </div>

    <div className='flex my-2 items-center gap-x-3'>
      <h2 className='font-semibold text-md '>Tax/Service Charge:</h2>
      <p>${taxAndServiceChargePrice}</p>
    </div>

    <div className='flex my-2 items-center gap-x-3'>
      <h2 className='font-semibold text-md '>Total Amount:</h2>
      <p>${totalPrice}</p>
    </div>

    </div>
        <div className="mt-4">
          <span className="font-semibold">Success! Amount Paid</span>
          
        </div>
      </div>
    </div>
)

  
  
};

export default Invoice;
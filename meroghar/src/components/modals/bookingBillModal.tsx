'use client'


// used for both booking modal and also renders the bill once the booking and payment is completed

import useBookingStore from "../../store/bookingStore"
import useModal from "../../store/useModal"
import { AiFillStar } from 'react-icons/ai'
const style1 = 'bg-white border border-[#99775C]/10 flex flex-col items-center justify-center rounded-xl shadow-lg md:w-[540px]'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useRouter } from "next/navigation"
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import dayjs from "dayjs"
import Modal from "./modal"
import Invoice from "../listing/invoiceUI"
import { createRef, useState } from 'react'
import { toast } from "react-hot-toast"
import Image from "next/image"




export function BookingModal() {
    const bookingModal = useModal()
    const billref = createRef<HTMLDivElement>()

    const bookingStore = useBookingStore()
    const router = useRouter();
    const { images, propertyType, name, avgRating, userId, rate, _id } = bookingStore.propertyData;
    const { startDate, endDate } = bookingStore.bookingInfo

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const totalDays = end.diff(start, 'day') + 1;
    const basePrice = totalDays * rate!
    const taxPrice = (basePrice / 100) * 18;
    const totalCost = basePrice + taxPrice;

    const handleDownloadPdf = async () => {
        const element = billref.current;
        const canvas = await html2canvas(element!);
        const data = canvas.toDataURL('image/png');
        console.log('data', data);
        //now uplaod 

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        const billpdf = pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('bill.pdf');

        bookingModal.onClose()
        bookingStore.setError(false)
        return router.refresh();
    };



    if (bookingModal.isOpen == 'booking') {
        return (
            <Modal isOpen={bookingModal.isOpen}>
                <main className={style1}>
                    <div className="w-full p-6 space-y-6">
                        {/* Property Image and Details */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-full h-48 rounded-xl relative overflow-hidden">
                                <Image
                                    src={images?.[0]?.imgUrl || '/placeholder-image.jpg'}
                                    alt="Property Image"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="w-full flex justify-between items-start p-2 bg-[#EAE7DD]/30 rounded-lg">
                                <div className="space-y-1">
                                    <p className="text-sm text-[#99775C]/70">{propertyType || 'Property'}</p>
                                    <h1 className="text-lg font-semibold text-[#99775C]">{name || 'Property Name'}</h1>
                                </div>
                                <div className="text-right">
                                    <p className="flex items-center gap-x-1 text-[#99775C]">
                                        <AiFillStar className="text-[#99775C]" />
                                        {avgRating || '0.0'}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#99775C]/80">
                                        {typeof userId === 'string' ? userId : userId?.userName || 'Host'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-[#99775C]">Booking Summary</h2>

                            <div className="space-y-3 p-4 bg-[#EAE7DD]/20 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="text-[#99775C]/80">Duration</p>
                                    <p className="font-medium text-[#99775C]">{totalDays} nights</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[#99775C]/80">Base Price</p>
                                    <p className="font-medium text-[#99775C]">${basePrice.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[#99775C]/80">Taxes & Fees</p>
                                    <p className="font-medium text-[#99775C]">${taxPrice.toFixed(2)}</p>
                                </div>
                                <div className="h-px bg-[#99775C]/10 my-2" />
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-[#99775C]">Total Amount</p>
                                    <p className="font-semibold text-[#99775C]">${totalCost.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* PayPal Button */}
                            <div className="pt-2">
                                <PayPalScriptProvider options={{ "client-id": 'AQBVm0xUYDKKY-d-Jf3xUHDSgGpDkw2N_9cvIXP_ty4BQZ_GWJidp5fWZRDgwjlSDsYq1Wv9SBJnbK-d' }}>
                                    <PayPalButtons
                                        style={{ layout: "horizontal", color: "gold", height: 48, tagline: false }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: totalCost.toString(),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions: any) => {
                                            return actions.order.capture().then(async (details: any) => {
                                                const name = details.payer.name.given_name;

                                                console.log(details)
                                                // account used for paying the bill 
                                                bookingStore.setBillData({
                                                    payerId: details.payer.payer_id,
                                                    paymentId: details.id
                                                });

                                                toast.success("Payment Successfull");

                                                router.refresh();
                                                return bookingModal.onOpen('bill')

                                            });
                                        }} />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
                </main>
            </Modal>
        )
    }

    if (bookingModal.isOpen == 'bill') {
        return (
            <Modal isOpen={bookingModal.isOpen}>
                <main className={style1}>
                    <div className="w-full p-3">
                        <div className="mb-2">
                            <h2 className="text-lg font-semibold text-[#99775C] text-center">Booking Confirmation</h2>
                            <p className="text-[#99775C]/70 text-center text-sm">Thank you for your booking!</p>
                        </div>

                        <div ref={billref} className="bg-white rounded-lg p-3 border border-[#99775C]/10 scale-[0.95]">
                            <Invoice
                                payerId={bookingStore.billData.payerId}
                                paymentId={bookingStore.billData.paymentId}
                                rate={rate!}
                                nights={totalDays}
                                tennantId="Random1"
                                propertyName={name!}
                                hostId={typeof userId === 'string' ? userId : userId!.userName!}
                                initialPrice={basePrice}
                                taxAndServiceChargePrice={taxPrice}
                                totalPrice={totalCost}
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                className="px-4 py-1.5 text-[#99775C] hover:text-[#886a52] font-medium transition-colors text-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    bookingModal.onClose();
                                    bookingStore.setError(false)
                                    return router.refresh();
                                }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="px-4 py-1.5 bg-[#99775C] text-white rounded-lg hover:bg-[#886a52] font-medium transition-all hover:shadow-md active:scale-[0.98] text-sm"
                                onClick={handleDownloadPdf}
                            >
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </main>
            </Modal>
        )
    }

    return null;






}

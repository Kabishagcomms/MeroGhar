'use client'

import { useState } from "react"
import { inputStyle } from "../styles/variants"
import { ErrorText } from "./random"
import {useForm,SubmitHandler} from 'react-hook-form'
import Api from "../api/client/axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function PasswordReset(){
    
    const router=useRouter();
    const {register,handleSubmit, formState:{ errors }}=useForm<{email:string}>({defaultValues:{
    email:""
    }})
    const onSubmit:SubmitHandler<{email:string}>=(formdata)=>{
        console.log(formdata)
        Api.post(`/auth/v1/forgotPassword/${formdata.email}`).then(()=>{
            toast.success("Please authorize Password Reset Mail send");
            router.refresh()

        }).catch(()=>{
            toast.error("Failed to Verify Email/Please Provide valid mail")
        })
    }
    return(
       
            <div className="w-full sm:w-[560px] border-2 p-3 shadow-lg rounded-lg border-gray-200">
                <h1 className="text-lg sm:text-xl font-semibold ">Forgot Password ?</h1>
                <p className="text-sm mt-5 text-themeColor ">Please Enter Valid Email to Reset password!</p>
                <hr className="border-gray-300  my-5" />
                <div>
                <label className="text-sm my-2 sm:text-ld font-semibold">Email</label>
                <div className="flex justify-center items-center">
                
                <input type="email" className={`${inputStyle}`}  {...register('email',{
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}/>
                <button className="text-sm font-semibold underline" onClick={handleSubmit(onSubmit)}>Reset password</button>
                </div>

        {errors?.email && (
          <ErrorText text="Please Enter Valid Email/Formatted Email" />
        )}
                </div>
            </div>
        
    )
}
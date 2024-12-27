'use client'

import useModal from "../../store/useModal"



import Modal from "./modal"

import { inputStyle } from "../../styles/variants"
import { useForm,  } from 'react-hook-form'
import { ErrorText } from "../random"

import useReject from "../../store/useReject"

import { useRouter } from "next/navigation"
interface formProps{
    message:string
}


export function MessageModal(){
    const confirmModal=useModal()
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
      } = useForm<formProps>()
      const reject=useReject();
    
    if(confirmModal.isOpen=='reject'){
        
    
    return(
        <>
        <Modal isOpen={confirmModal.isOpen}>
          <div className="bg-white w-full p-4 rounded-lg shadow-lg border-2 border-gray-300 md:w-[550px]">

          <div className='w-full my-4'>
        <label className='block my-1 text-sm font-semibold'>Message</label>
            <input
            type="textarea"
            placeholder="message"
            className={inputStyle}
            {...register('message', { required: true, minLength:1 })}
          />
          {errors.message && ( <ErrorText text='Please Enter Accept/Reject Message for clarity'/>)}
        </div>



            <hr className="border-gray-400"/>
            <div className=" mt-4 flex items-center justify-around">
                <button className="font-sm font-semibold underline" 
                onClick={(e)=>{
                    e.preventDefault();
                    confirmModal.onClose()
                }}>Cancel</button>


                <button type='submit' onClick={handleSubmit(async(data)=>{

                  //only meessage needs to be passed since id is already access while rendering the model 
                  //and action for the model has beeen set before rendering the modal
                    reject.action.onReject(data.message)
                  
                  
                })} className={`py-2 px-4 text-white font-semibold rounded-lg ${'bg-red-500 hover:bg-red-700'}`}>{reject.btn}</button>
            </div>

          </div>
        </Modal>
        
        </>
    )}
    return null;
}



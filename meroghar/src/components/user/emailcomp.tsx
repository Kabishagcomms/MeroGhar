'use client'

import { useForm, SubmitHandler, set } from 'react-hook-form'
import { inputStyle } from '../../styles/variants'
import { ErrorText
 } from '../random'
import Api from '../../api/client/axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface props{
    email:string
    setphonemail: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmailComp({email,setphonemail}:props){

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
      } = useForm<{email:string}>({
        defaultValues:{
          email
        
          //donot put image here since onlyfile can be default 
        }
      })

      const router=useRouter()
      const onSubmit:SubmitHandler<{email:string}>=async(formdata)=>{
        const res=await Api.post(`/user/v1/addEmail`,{email:formdata.email},{withCredentials:true}).then(
            (res)=>{
                toast.success("Please Verify Email for completion!")
                router.refresh()
                setphonemail("close")
            }
        ).catch((e)=>{
            toast.error("Email Post Failed")
        })
      }
    return(
        <div className="w-full my-3 ">
        <label className=" text-md font-semibold block  text-slate-700">Email</label>
        <div className='flex items-center justify-between flex-wrap'>
        <div className='mt-1 w-full sm:w-[70%]'>
        <input
          type="email"
          placeholder="Email"
          className={inputStyle}
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        </div>
       
        <button className='text-sm my-2 text-white font-semibold px-4 py-2 transition-all rounded-lg bg-themeColor hover:bg-mainColor' onClick={handleSubmit(onSubmit)}>{email==''? 'Add Email' :"Update Email"}</button>
        </div>
       
        {errors?.email && (
          <ErrorText text="Please Enter Valid Email/Formatted Email" />
        )}
    
    {/* <p className='text-sm font-semibold text-themeColor my-2'>New Mail/verify Existing Email</p> */}
    <button className=' ml-1 text-sm font-semibold underline mt-2' onClick={(e)=>setphonemail('close')}>Cancel</button>
    </div>
    
    )
}
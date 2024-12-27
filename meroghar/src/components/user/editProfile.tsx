'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { ErrorText } from '../random'
import {useState} from 'react'
import { uploadImage } from '../../api/client/uploadImag'
import {  toast } from 'react-hot-toast'
import Api from '../../api/client/axios'
import useConfirm from '../../store/useConfirm'
import useModal from '../../store/useModal'
import { useRouter } from 'next/navigation'
import useAccount from '../../store/AccountState'
import Image from 'next/image'
interface EditProfile {
  userName?: string
  profileImg?: any|{
    imgId:string,
    imgUrl:string
  }
  about?: string
}

const inputStyle =
  'text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor'

interface Prop{
    userName:string,
    about:string,
    img:string,
   
}

export function EditBasic({userName,about,img}:Prop) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<EditProfile>({
    defaultValues:{
      userName,
      about
    }
  })

  const confirm=useConfirm();
  const confirmModal=useModal();
  const router=useRouter()
  const account=useAccount()

  const [error,seterror]=useState(false);

      // every change detected is recorded here we want to fetch the image information only 
      const image=watch('profileImg')
      
      const imageUrl=()=>{
        try{
            return  URL.createObjectURL(image[0])
        }catch(e){
          
          return img||''
        }
      }



      const submitHandler:SubmitHandler<EditProfile>=async(formdata)=>{
        if(formdata.userName==""&&formdata.about==""&&formdata.profileImg.length===0){
          return seterror(true);
        }
        seterror(false)
        
        const onSubmit=async()=>{
          try{

            //open loading 
            confirmModal.setLoading(true);

            let profileData:EditProfile={
              userName:formdata.userName,
              about:formdata.about,
              profileImg:{
                imgUrl:"",
                imgId:""
              }
            }
  
  
            if(formdata.userName==""){
              delete profileData.userName;
            }
  
            if(formdata.about==""){
              delete profileData.about;
            }
  
            if(formdata.profileImg.length===0){
              delete profileData.profileImg;
            }else{
              //upload image
            const upload=await uploadImage(formdata.profileImg[0]);
            if(upload){
              profileData.profileImg.imgId=upload.imgId,
              profileData.profileImg.imgUrl=upload.imgUrl
            }
            }

  
            console.log(profileData);
            const updateProfile=await Api.patch('/user/v1/updateProfile',{...profileData},{withCredentials:true});
            if(updateProfile.data.success){
               toast.success("User profile Data SuccessFully Updated");
                account.onClose()
                confirmModal.setLoading(false)
               confirmModal.onClose();
               return router.refresh();
            }
            confirmModal.setLoading(false)
            confirmModal.onClose();
            toast.error("Profile Upload Failed")
              
  
          }catch(e){
              console.log(e)
              confirmModal.setLoading(false)
            confirmModal.onClose();
             return toast.error("Profile Upload Failed")
            
          }
        }

        // for confirmation update default state 
        confirm.onContent({
          header:"Are you sure U Want to Update Profile Details?",
          actionBtn:"Update",
          onAction:onSubmit
        })

        confirmModal.onOpen('confirm');

      }


  return (
    <main className='w-[95%]  p-4 md:w-[70%]  '>
      <form>
        
        <div
          className="my-4 flex  w-full flex-col  gap-y-4   " >
            <label className=" block text-sm text-black font-semibold">Profile Image</label>
          {/* initially the value default does not read file casuing to return empty string */}
          <Image
          width={160}
          height={160}
            src={imageUrl()}
            alt="ImagePreviewHere"
            className={
              imageUrl() == ''
                ? 'hidden'
                : ' rounded-full border-2 p-1 border-gray-300 shadow-lg w-[100px] h-[100px] md:w-[160px] md:h-[160px]'
            }
          />

          {/* for input and label */}
          <div className="flex bg-white  w-[95%] flex-col items-start justify-around rounded-lg border-2 border-gray-300 p-2 shadow-md md:w-[65%] md:flex-row md:items-center">
           
            <input
              type="file"
              
              {...register(`profileImg`,)}
            ></input>

            {/* donot render this button for 1st index */}

          </div>
         


        </div>
        <div className="w-full my-4">
          <label className=" block my-1 text-sm text-black font-semibold">UserName</label>
          <input
            type="text"
            placeholder="userName"
            className='text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-2 text-gray-700 hover:bg-hoverColor focus:border-themeColor md:w-[70%]'
            {...register('userName')}
          />

        </div>

        <div className='w-full my-4'>
        <label className='block text-sm text-black font-semibold'>About</label>
            <textarea rows={5}
            placeholder="Desription"
            className={inputStyle}
            {...register('about')}>

           </textarea>
           
          
         
        </div>

      { error&& <ErrorText text='Please Enter Valid Profile Update Input '/>}
        <div className='flex my-2 items-center justify-between p-2'>
        <button onClick={(e)=>{
            e.preventDefault();
          account.onClose()
        }} className='underline font-semibold text-sm'>Cancel</button>
        <button type='submit' onClick={handleSubmit(submitHandler)} className='font-semibold text-white py-2 px-4 rounded-lg bg-themeColor hover:bg-mainColor transition-all' >save</button>
        </div>
       
      </form>
    </main>
  )
}

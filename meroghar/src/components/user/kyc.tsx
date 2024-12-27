'use client'


import { useState } from 'react'


import { useForm, SubmitHandler } from 'react-hook-form'

import { ErrorText } from '../random'

const inputStyle='text-md my-1 h-10 w-[90%]  rounded-md border-2  border-gray-400 p-1 text-gray-700 hover:bg-hoverColor focus:border-themeColor'

import 'react-phone-input-2/lib/style.css'

import {postKyc} from '../../api/client/user'
import { uploadImage } from '../../api/client/uploadImag'
import { KycData } from '../../interface/form'
import useModal from '../../store/useModal'
import useConfirm from '../../store/useConfirm'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { PhoneComp } from './phone'
import { useEffect } from 'react'
import useCountry from '../../store/useCountry'
import { ICountry, IState, ICity } from 'country-state-city'
import { FetchedMe } from '../../interface/response'
import Image from 'next/image'

interface form {
  firstName: string
  lastName: string
  gender: string

    country: string,
    state:string,
    city: string,

  email?: string
  img: any|{
        imgId: string
        imgUrl: string
      }
}

interface kycprops {
  setopenKyc: React.Dispatch<React.SetStateAction<string>>
  userData:Partial<FetchedMe>
}

export default function Kyc({ setopenKyc,userData }: kycprops) {
  const {email,kyc,kycInfo}=userData
 
  const confirmData=useConfirm();
        // for country state and city
        const [countries, setCountries] = useState<ICountry[]>([]);
        const country=useCountry();
        const confirm=useConfirm();
        const confirmModal=useModal();
        const router=useRouter();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<form>({
    defaultValues:{
      firstName:kycInfo!.firstName,
      lastName:kycInfo!.lastName,
      gender:kycInfo!.gender,
      
        country:kycInfo!.country,
        state:kycInfo!.state,
        city:kycInfo!.city,
     
      
      //donot put image here since onlyfile can be default 
    }
  })
  const gender = ['Male', 'Female', 'Others']
  const img = watch('img')

  // here if file reads image then image is previewed else default image fetched is shwos
  const imageUrl = () => {
    try {
      return URL.createObjectURL(img[0])
    } catch (e) {
      console.log(e)
      return kycInfo!.img.imgUrl||''
    }
  }

useEffect(()=>{
        setCountries(country.Countries)
},[])

  const onSubmit: SubmitHandler<form> = async (formdata) => {


    const submitAction=async()=>{

      confirmModal.setLoading(true)
      //create new object  to be passed into api request
      //data which is not passed will not replce or update existing data in db so careful what u pass
      let kycdata: KycData = {
        kycInfo: {
          firstName:formdata.firstName,
          lastName:formdata.lastName,
          email:kycInfo!.email,
          gender:formdata.gender,
         
            country:kycInfo!.country==formdata.country? formdata.country:  country.getCountryData(parseInt(formdata.country)).name,
            state:kycInfo!.state==formdata.state? formdata.state: country.getStateData(parseInt(formdata.country),parseInt(formdata.state)).name,
            city:formdata!.city,
         
          phoneNumber:kycInfo!.phoneNumber,
          img:{
            imgId:'',
            imgUrl:""
          }
          
        },
      }

      
      if(formdata.img.length!=0){
        // for update image can be empty so u have to use old image 
      const uploadedImage= await uploadImage(formdata.img[0]);
      if(uploadedImage){
        kycdata.kycInfo.img!.imgId=uploadedImage.imgId;
        kycdata.kycInfo.img!.imgUrl=uploadedImage.imgUrl

      }
      }else{
        kycdata.kycInfo.img!.imgId=kycInfo!.img.imgId;
        kycdata.kycInfo.img!.imgUrl=kycInfo!.img.imgUrl;
      }

     

  
      console.log('kycdata',kycdata)
      // post kyc information ssa
      const kyc=await postKyc(kycdata)
      if(!kyc){
        toast.error("Failed to Post/Update Kyc")
        confirmModal.setLoading(false)
        return confirmModal.onClose()
      }
  
      toast.success('kyc posted/Updated successfuly')
      confirmModal.setLoading(false)
      confirmModal.onClose()
      setopenKyc('close')
      return router.refresh();
      
    }


  // call the main confirmation trigger
    try{ 
    confirmData.onContent({
      header:'Are You Sure To Submit Kyc?',
      actionBtn:"Submit",
      onAction:submitAction
    })
    

    confirmModal.onOpen('confirm')
    }catch(e:any){
      console.log(e);
      return toast.error(e.message)
    }

   

  }

  


  return (
    <main key={'fuckU'} className="mt-5 w-full rounded-lg   p-4  ">

      <h2 className='text-xl font-semibold mb-5'>Kyc Form</h2>
      <hr className="my-5 border-gray-400" />
      
      <form>

<div className="grid my-3  w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">

          <div className="w-full">
            <label className=" text-sm font-semibold block  text-slate-700">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className={inputStyle}
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <ErrorText text="Please Enter Valid firstName" />
            )}
          </div>

          <div className="w-full">
            <label className="  text-sm font-semibold block  text-slate-700">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className={inputStyle}
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <ErrorText text="Please Enter Valid lastName" />
            )}
          </div>


          <div className="w-full">
            <label className=" text-sm font-semibold block  text-slate-700">Gender</label>

            <select
              className={inputStyle}
              {...register('gender', { required: true })}
            >
                <option value="" >Select Gender</option>
              {gender.map((type,index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>

            {errors.gender && <ErrorText text="Select Property Type Pls" />}
          </div>

</div>
          

  <div className='w-full my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>Country </label>
        <select className={inputStyle} defaultValue={kycInfo!.country} {...register('country', { required: true})}>
        <option value={kycInfo!.country}>{kycInfo!.country==''?'Select a Country':kycInfo!.country}</option>
                {
                    countries.map((country,index)=><option key={index} value={index}>{country.name}</option>)
                }
        </select>


          {errors?.country && ( <ErrorText text='Please Select Valid Country'/>)}
      </div>

      <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>State </label>
        <select className={inputStyle}  {...register('state', { required: true})}>
        <option value={kycInfo!.state}>{kycInfo!.state==''?'Select a State':kycInfo!.state}</option>
                {
                    
                    country.getStates(parseInt(watch('country'))).map((state,index)=><option key={index} value={index}>{state.name}</option>)
                }
        </select>
          {errors?.state && ( <ErrorText text='Please Select Valid State'/>)}
        </div>

        <div className='w-full'>
        <label className='block my-1 text-sm font-semibold'>City</label>
        <select className={inputStyle}  {...register('city', { required: true})}>
                <option value={kycInfo!.city}>{kycInfo!.city==''?'Select a City':kycInfo!.city}</option>
                {
                    
                    country.getCities(parseInt(watch('country')),parseInt(watch('state'))).map((city,index)=><option key={index} value={city.name}>{city.name}</option>)
                }
        </select>
          {errors?.city && ( <ErrorText text='Please Select Valid City'/>)}
        </div>
      
      </div>
        
       

        
        <div className="w-full my-6">
          <div className="my-2 flex  w-full flex-col items-center gap-y-3">
            {/* initially the value default does not read file casuing to return empty string */}
              <div   className={
                imageUrl() == ''
                  ? 'hidden'
                  : 'h-[200px] w-full rounded-lg  sm:h-[270px] md:h-[300px] md:w-[80%] lg:h-[350px]'
              }>

            <Image
              fill={true}
              src={imageUrl()}
              alt="ImagePreviewHere"
            
            />
            </div>
          

            {/* for input and label */}
            <div className="flex w-full flex-col items-start justify-around rounded-lg border-2 border-gray-300 p-[6px] shadow-md md:w-[60%] md:flex-row md:items-center">
              <label className="text-sm font-semibold block  text-slate-700 ">Upload Image </label>
              <input
                type="file"
                {...register(`img`, { required:kycInfo!.img.imgUrl==''?true:false })}
              ></input>

              {/* donot render this button for 1st index */}
            </div>
            <p className="text-sm text-themeColor font-semibold">
              Please provide proof of Identification CitizenShip/Passport/Driving License
            </p>
            {errors?.img && (
              <p className="block w-[95%] text-center text-sm text-red-700">
                Please Upload image for the Field
              </p>
            )}
          </div>
        </div>

        <hr className="my-5 border-gray-400" />

        <div className="my-2 bg-slate-200 p-4 rounded-lg flex items-center justify-between">
          <button
            className="text-md font-semibold underline"
            onClick={(e) => {
              e.preventDefault()

              setopenKyc('close')
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg border border-white bg-themeColor p-2 text-white transition-all hover:bg-mainColor"
            onClick={handleSubmit(onSubmit)}
          >
            Submit Kyc
          </button>
        </div>
      </form>
    </main>
  )
}

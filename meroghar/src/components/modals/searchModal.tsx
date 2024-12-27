'use client'

import useRandom from "../../store/randomStore"
import { useForm, SubmitHandler } from 'react-hook-form'
import useModal from "../../store/useModal"
import { ErrorText } from "../random"
import { inputStyle } from "../../styles/variants"
import { propertyOptions } from "../../configs/constant"
import useCountry from "../../store/useCountry"
import { useState } from "react"
import { ICountry } from "country-state-city"
import { amenities } from "../../configs/constant"
import qs from "query-string"

export interface SearchForm{
  minRate:number,
  maxRate:number,
  propertyType:string,
  country:string,
  state:string,
  city:string,
  // startDate?:string,
  // endDate?:string,
  rating:number,
  amenities:string[]
}


import Modal from "./modal"
import { useRouter } from "next/navigation"

export function SearchModal(){
  const modal=useModal()
  const list = useRandom()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<SearchForm>({
    defaultValues:{
      country:"",
      state:"",
      city:"",
      propertyType:'',
      amenities:[''],
      minRate:0,
      maxRate:0,
      rating:0
    },
    mode: 'onChange',
  })

    // for country state and city
 
    const countryhook = useCountry()
    const [countries, setCountries] = useState<ICountry[]>(countryhook.Countries)
    const router=useRouter()

    //form handler 
    const onSubmit:SubmitHandler<SearchForm>=(formdata)=>{
      try{
        //filter amenities 
        const amenities = formdata.amenities.filter((item) => item != '')
        formdata.amenities=amenities;
        
       let query:any={...formdata}

       if(query.country!=''){
        query.country=countryhook.getCountryData(parseInt(formdata.country)).name
        
       }

       if(query.state !=''){
         countryhook.getStateData(
          parseInt(formdata.country),
          parseInt(formdata.state)
        ).name
       }


       console.log('query',query)


        // if (query.startDate) {
        //   query.startDate! = formatISO(query.startDate);
        // }
    
        // if (query.endDate) {
        //   query.endDate! = formatISO(query.endDate);
        // }

        const url = qs.stringifyUrl({
          url: '/Home',
          query:query,
        }, { skipNull: true });

        modal.onClose();
        return router.push(url);



      }catch(e){
        console.log(e)
      }
    }


    if(modal.isOpen!='search'){
        return null;
    }
    return(
        <div>
        <Modal isOpen={modal.isOpen}>

        {/* enitre login hai */}
        <div className="bg-white  w-full h-[500px] overflow-y-scroll md:w-[600px] rounded-lg">

        <header className=" top-0 sticky bg-white text-center text-md p-3 sm:text-lg font-semibold border-b-2 border-gray-200">
        Filters
        </header>

        {/* for body */}
        <div className="p-5">
        <h1 className=" text-lg sm:text-xl font-semibold ">Price Range</h1>
        <p className="my-2 text-md text-gray-600 ">Please Provide range of Rate per Night for better Result!</p>
       
       {/* price range input */}
        <div className="p-5 flex justify-center gap-x-6 items-center flex-wrap">

        {/* price input */}
        <div className="w-full sm:w-fit">
              <label className="my-1 block text-sm font-semibold">MinRate/Night</label>
              <input
                type="number"
                placeholder="Min price"
                className={inputStyle}
                {...register('minRate', {minLength: 1, min:{value:0,message:"Please enter non negative no."} })}
              />
              {errors.minRate && <ErrorText text="Please Enter Valid Price" />}
            </div>
         

          <div className="w-full sm:w-fit">
              <label className="my-1 block text-sm font-semibold">MaxRate/Night</label>
              <input
                type="number"
                placeholder="Max Price"
                className={inputStyle}
                {...register('maxRate', {minLength: 1, min:{value:0,message:"Please enter non negative no."} })}
              />
              {errors.maxRate && <ErrorText text="Please Enter Valid Price" />}
            </div>
          </div>

      <hr className="bg-gray-200 mb-5" />
      {/* property Type */}
      <h1 className=" text-lg sm:text-xl font-semibold ">Property Type</h1>

      <div className="p-5">

      <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Property Type
              </label>
              <select
                className={inputStyle}
                {...register('propertyType')}
              >

            <option value={''}>
                 
                 Select Property Type
                 
             </option>
                {propertyOptions.map((type,index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>

              {errors.propertyType && (
                <ErrorText text="Select Property Type Pls" />
              )}
            </div>

      </div>

      <hr className="bg-gray-200 mb-5" />
      {/* property Type */}
      <h1 className=" text-lg sm:text-xl font-semibold ">Location Information</h1>


      <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Country{' '}
              </label>
              <select
                className={inputStyle}
                {...register('country')}
              >
                <option value={''}>
                 
                    Select a Country
                    
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={index}>{country.name}</option>
                ))}
              </select>

              {errors?.country && (
                <ErrorText text="Please Select Valid Country" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">State </label>
              <select
                className={inputStyle}
                {...register('state')}
              >
                <option value={''}>
                  
                   Select a state
                  
                </option>
                {countryhook
                  .getStates(parseInt(watch('country')))
                  .map((state, index) => (
                    <option key={index} value={index}>{state.name}</option>
                  ))}
              </select>
              {errors?.state && (
                <ErrorText text="Please Select Valid State" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">City</label>
              <select
                className={inputStyle}
                {...register('city')}
              >
                <option value={''}>
                 
                     Select a City
                    
                </option>
                {countryhook
                  .getCities(
                    parseInt(watch('country')),
                    parseInt(watch('state'))
                  )
                  .map((city,index) => (
                    <option key={index} value={city.name}>{city.name}</option>
                  ))}
              </select>
              {errors?.city && (
                <ErrorText text="Please Select Valid City" />
              )}
            </div>
          </div>


      <hr className="bg-gray-200 my-5" />
      {/* property Type */}
      <h1 className=" text-lg mb-3 sm:text-xl font-semibold ">Minimum Rating</h1>

                  {/* price input */}
        <div className="w-full sm:w-fit">
             
              <input
                type="number"
                placeholder="Min Rate"
                className={inputStyle}
                {...register('rating', {maxLength: 1, min:{value:0,message:"Please enter valid value."} ,max:{value:5,message:"Please enter valid value"} })}
              />
              {errors.minRate && <ErrorText text="Please Enter Valid Rating" />}
            </div>

        

      <hr className="bg-gray-200 my-5" />
      {/* property Type */}
    
      <h1 className=" text-lg mb-3 sm:text-xl font-semibold ">Amenities</h1>

          {/* checkBox */}
          <div className="w-full ">
         
           
            <div className=" my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {amenities.map((items, index) => {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={items}
                      {...register(`amenities.${index}` as const)}
                      className="cursor-pointer"
                    />
                    <label className="mx-2 text-sm text-gray-600">
                      {items}
                    </label>
                  </div>
                )
              })}
            </div>
          
        </div>         




          </div>

        <div className=" bottom-0 sticky w-full py-2 bg-white border-t-2 flex items-center justify-between">
          <button className="ml-3 text-md font-semibold underline text-black"
          onClick={(e)=>{
            e.preventDefault();
           return  modal.onClose()
          }}
          >Cancel</button>
        <button type="submit" className=" mr-3 px-4 py-2 font-semibold text-white bg-themeColor hover:bg-mainColor rounded-lg" onClick={handleSubmit(onSubmit)}> Search</button>
        </div>


        </div>

        
       

       

        

        </Modal>
        
        </div>
      
    )
}

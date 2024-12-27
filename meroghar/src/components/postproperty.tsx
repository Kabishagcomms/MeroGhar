'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { ErrorText } from './random'
import { PropertyForm} from '../interface/form'

import { Images } from '../interface/request'
import { PostPropery, UpdatePropery } from '../api/client/property'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { amenities, propertyOptions } from '../configs/constant'
const inputStyle ='text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-1 text-gray-700 hover:bg-hoverColor focus:border-themeColor'
import { useState, useEffect } from 'react'
import useCountry from '../store/useCountry'
import { ICountry} from 'country-state-city'
import useConfirm from '../store/useConfirm'
import useModal from '../store/useModal'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Property } from '../interface/response'
import useRandom from '../store/randomStore'
import { uploadImage } from '../api/client/uploadImag'
import Image from 'next/image'

//checck image function

interface postProperty {
  propertyData?: Partial<Property>
  isUpdate: boolean
}

export default function PostPropertyForm({
  isUpdate,
  propertyData,
}: postProperty) {
  
  console.log('propertty data on updatye',propertyData,isUpdate)
  let defaultValues: PropertyForm = {
    images:['default'],
    name: '',
   
      country: '',
      city: '',
      state: '',

    discription: '',
    rules: '',
    amenities: [],
    rate: 0,
    propertyType:'hotel',
  }

  // If this is an update form, set the default values based on the passed property data
  if (isUpdate && propertyData) {
    defaultValues.images = propertyData.images || defaultValues.images
    defaultValues.name = propertyData.name || ''
    defaultValues.country = propertyData.country || defaultValues.country,
    defaultValues.state = propertyData.state || defaultValues.state,
    defaultValues.city = propertyData.city || defaultValues.city,
    defaultValues.discription = propertyData.discription || ''
    defaultValues.rules = propertyData.rules! || ''
    defaultValues.amenities = propertyData.amenities || []
    defaultValues.rate = propertyData.rate || 0
    defaultValues.propertyType = propertyData.propertyType || 'hotel'
  }

  const list = useRandom()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<PropertyForm>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({ name: 'images', control })

  // for country state and city
  const [countries, setCountries] = useState<ICountry[]>([])
  const countryhook = useCountry()
  const confirmModal = useConfirm()
  const modal = useModal()
  const router = useRouter()

  useEffect(() => {
    setCountries(countryhook.Countries)
  }, [])

  // every change detected is recorded here we want to fetch the image information only
  const imagesS = watch('images')

  const imageUrl = (index: number) => {
    try {
      return URL.createObjectURL(imagesS[index][0])
    } catch (e) {
      try {
        if (propertyData?.images![index].imgUrl) {
          return propertyData.images[index].imgUrl
        }
      } catch (e) {
        return ''
      }
    }
  }

  const onSubmit: SubmitHandler<PropertyForm> = async (formdata) => {

    const postConfirmation = async () => {
      modal.setLoading(true)
      const amenities = formdata.amenities.filter((item) => item != '')

      const { name, country,state,city, discription, rate, propertyType, rules } =
        formdata
      let images: Images[] = []

      //there might be multiple image upload so
      const imageData = new FormData()
      //since there might be multiple images
      for (const image of formdata.images) {
        const uploadedImg = await uploadImage(image[0])

        await images.push({
          imgId: uploadedImg.imgId,
          imgUrl: uploadedImg.imgUrl,
        })
      }

      let RequestBody: PropertyForm={
        name,
        
          country: countryhook.getCountryData(parseInt(country)).name,
          state: countryhook.getStateData(
            parseInt(country),
            parseInt(state)
          ).name,
          city:city,
        
        discription,
        rate,
        propertyType,
        rules,
        amenities,
        images,
      }
      console.log(RequestBody)
      console.log(RequestBody.images)

      try {
        const newProperty = await PostPropery(RequestBody)
        if (newProperty) {
          toast.success('Property Posted Successfully')
          modal.onClose()
          list.onList('close')
          modal.setLoading(false)
          return router.refresh()
        }
      } catch (e: any) {
        console.log(e)
        toast.error(`property Post Failed/${e.message}`)
        modal.setLoading(false)
        modal.onClose()
      }
    }

    //now for update property

    const updateConfirmation = async () => {

      modal.setLoading(true)
      const amenities = formdata.amenities.filter((item) => item != '')

      const { name, country,state,city, discription, rate, propertyType, rules } =
        formdata
      let images: Images[] = []
      //since there might be multiple images
      for (const image of formdata.images) {
        try {
          //if its able to crrate url itsfile if its not then obj
          const imgurl = URL.createObjectURL(image[0])
          console.log('uploaded img')
          const { imgId, imgUrl } = await uploadImage(image[0])
          images.push({ imgId: imgId, imgUrl: imgUrl })
        } catch (e) {
          console.log(e)
          console.log('object')
          images.push(image)
        }
      }

      let RequestBody: PropertyForm = {
        name,
        
          country:
            propertyData?.country == formdata.country
              ? formdata.country
              : countryhook.getCountryData(parseInt(formdata.country))
                  .name,
          state:
            propertyData?.state == formdata.state
              ? formdata.state
              : countryhook.getStateData(
                  parseInt(formdata.country),
                  parseInt(formdata.state)
                ).name,
          city: formdata.city,
        
        discription,
        rate,
        propertyType,
        rules,
        amenities,
        images,
      }

      console.log('final form', RequestBody)

      try {
        const uProperty = await UpdatePropery(propertyData?._id!, RequestBody)
        if (uProperty) {
          toast.success('Property updated Successfully/Needs Reverification')
          modal.onClose()
          list.onList('close')
          modal.setLoading(false)
          return router.refresh()
        }
      } catch (e: any) {
        console.log(e)
        toast.error(`property update Failed/${e.message}`)
        modal.setLoading(false)
        modal.onClose()
      }
    }

    //confirmation logic
    confirmModal.onContent({
      header: isUpdate
        ? 'Are You Sure You Want To Update?'
        : 'Are You sure You Want to Post',
      actionBtn: isUpdate ? 'Update Property' : 'Post Property',
      onAction: isUpdate ? updateConfirmation : postConfirmation,
    })

    //render modal
    modal.onOpen('confirm')
  }

  return (
    <main className="my-2 flex w-full flex-col items-center justify-center  p-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex  w-full flex-col items-center p-3 lg:w-full"
      >
        {isUpdate && (
          <p className="text-lg font-semibold text-themeColor">
            Adding New Images will replace previous images{' '}
          </p>
        )}
        <div className="w-full p-2">
          {fields.map((field, index) => {
            return (
              <div
                className="my-1 flex  w-full flex-col items-center gap-2 "
                key={field.id}
              >
                
                {/* initially the value default does not read file casuing to return empty string */}
                <div  className={
                    imageUrl(index) == ''
                      ? 'hidden'
                      : 'h-[200px] w-full rounded-lg  sm:h-[270px] md:h-[320px] md:w-[80%] lg:h-[400px]'
                  }>
                <Image
                  fill={true}
                  src={imageUrl(index)!}
                  alt='Image Here'
                 
                />
                </div>
               

                {/* for input and label */}
                <div className="flex  w-full flex-col items-start justify-around rounded-lg border-2 border-gray-300 bg-white p-[6px] shadow-md md:w-[60%] md:flex-row md:items-center">
                  <label className="my-1 block text-sm font-semibold">
                    Upload Image{' '}
                  </label>
                  <input
                    type="file"
                    key={field.id}
                    {...register(`images.${index}` as const, {
                      required: isUpdate ? false : true,
                    })}
                  ></input>

                  {/* donot render this button for 1st index */}

                  {index != 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded-lg border-2 border-gray-400 hover:bg-red-300"
                    >
                      <AiOutlineMinus className="h-6 w-6 fill-red-500 stroke-themeColor" />
                    </button>
                  )}
                </div>
                {errors?.images?.[index] && (
                  <p className="block w-[95%] text-center text-sm text-red-700">
                    Please Upload image for the Field
                  </p>
                )}
              </div>
            )
          })}

          <button
            type="button"
            onClick={() => append({ image: 'newImage' })}
            className="my-2 rounded-lg border-2 border-gray-400 hover:bg-hoverColor  "
          >
            <AiOutlinePlus className="h-6 w-6 fill-themeColor stroke-themeColor" />
          </button>
        </div>

        <div className="w-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
          <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className=" my-1 block text-sm font-semibold">
                Property Title
              </label>
              <input
                type="text"
                placeholder="PropertyName"
                className={inputStyle}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <ErrorText text="Please Enter Valid PropertyName" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Property Type
              </label>
              <select
                className={inputStyle}
                {...register('propertyType', { required: true })}
              >
                {propertyOptions.map((type,index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>

              {errors.propertyType && (
                <ErrorText text="Select Property Type Pls" />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">Usd Rate/Night</label>
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                {...register('rate', { required: true, minLength: 1, min:{value:0,message:"Please enter non negative no."} })}
              />
              {errors.rate && <ErrorText text="Please Enter Valid Price" />}
            </div>
          </div>
          {/* div for city and area  */}

          <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Country{' '}
              </label>
              <select
                className={inputStyle}
                {...register('country', { required: true })}
              >
                <option value={defaultValues.country}>
                  {defaultValues.country == ''
                    ? 'Select a Country'
                    : defaultValues.country}
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
                {...register('state', { required: true })}
              >
                <option value={defaultValues.state}>
                  {defaultValues.state == ''
                    ? 'Select a state'
                    : defaultValues.state}
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
                {...register('city', { required: true })}
              >
                <option value={defaultValues.city}>
                  {defaultValues.city == ''
                    ? 'Select a City'
                    : defaultValues.city}
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
        </div>

        <div className="my-4 w-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
          <div className="w-full">
            <label className="my-1 block text-sm font-semibold">
              Property Description
            </label>
            <textarea
              rows={5}
              placeholder="Desription"
              className={inputStyle}
              {...register('discription', { required: true })}
            ></textarea>

            {errors.discription && (
              <ErrorText text="Please Enter Valid Property Description" />
            )}
          </div>

          <div className="my-2 w-full">
            <label className="my-1 block text-sm font-semibold">Rules</label>
            <textarea
              rows={5}
              placeholder="Rules"
              className={inputStyle}
              {...register('rules', { required: true })}
            ></textarea>

            {errors.rules && <ErrorText text="Please Enter Rules/Criteria" />}
          </div>
        </div>

        {/* checkBox */}
        <div className="w-full ">
          <div className=" mx-auto rounded-lg border-2  border-gray-200 bg-white p-4 shadow-lg  hover:bg-hoverColor ">
            <span className="my-1 block text-sm font-semibold">Amenities</span>
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
      </form>

      <hr className="my-5 border-gray-400" />

      <div className="w-full  rounded-lg bg-slate-300 p-4 ">
        <div className=" mx-auto flex  w-[97%] items-center justify-between">
          <button
            type="button"
            className="text-md font-semibold underline"
            onClick={(e) => {
              e.preventDefault()
              list.onList('close')
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-md cursor-pointer rounded-md bg-themeColor p-2 px-4 font-semibold text-white transition-all hover:bg-mainColor"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  )
}

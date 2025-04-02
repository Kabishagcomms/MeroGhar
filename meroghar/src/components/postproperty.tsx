'use client'

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

import { ErrorText } from './random'
import { PropertyForm } from '../interface/form'

import { Images } from '../interface/request'
import { PostPropery, UpdatePropery } from '../api/client/property'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { amenities, propertyOptions } from '../configs/constant'

import { useState, useEffect } from 'react'
import useCountry from '../store/useCountry'
import { ICountry } from 'country-state-city'
import useConfirm from '../store/useConfirm'
import useModal from '../store/useModal'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Property } from '../interface/response'
import useRandom from '../store/randomStore'
import { uploadImage } from '../api/client/uploadImag'
import Image from 'next/image'

//checck image function
const inputStyle =
  'text-md my-1 h-10 w-[95%]  rounded-md border-2  border-gray-400 p-1 text-gray-700 hover:bg-[#D3D3D3]/50 focus:border-[#59b077]'

interface postProperty {
  propertyData?: Partial<Property>
  isUpdate: boolean
}

export default function PostPropertyForm({
  isUpdate,
  propertyData,
}: postProperty) {
  console.log('propertty data on updatye', propertyData, isUpdate)
  let defaultValues: PropertyForm = {
    images: ['default'],
    name: '',

    country: '',
    city: '',
    state: '',

    discription: '',
    rules: '',
    amenities: [],
    rate: 0,
    propertyType: 'hotel',
  }

  // If this is an update form, set the default values based on the passed property data
  if (isUpdate && propertyData) {
    defaultValues = {
      ...defaultValues,
      ...propertyData,
      images: propertyData.images || defaultValues.images
    }
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

      const {
        name,
        country,
        state,
        city,
        discription,
        rate,
        propertyType,
        rules,
      } = formdata
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

      let RequestBody: PropertyForm = {
        name,

        country: countryhook.getCountryData(parseInt(country)).name,
        state: countryhook.getStateData(parseInt(country), parseInt(state))
          .name,
        city: city,

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



    const updateConfirmation = async () => {
      modal.setLoading(true)
      const amenities = formdata.amenities.filter((item) => item != '')

      const {
        name,
        country,
        state,
        city,
        discription,
        rate,
        propertyType,
        rules,
      } = formdata
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
            : countryhook.getCountryData(parseInt(formdata.country)).name,
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
        ? 'Confirm Update Property'
        : 'Confirm Posting Property',
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
          <p className="text-md font-medium text-[#000000]">
            Adding New Images will{' '}
            <span className="">replace</span> previous images{' '}
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
                {/* Image preview section */}
                <div
                  className="mb-5 relative h-[250px] w-full rounded-lg sm:h-[270px] md:w-[80%] lg:h-[350px]"
                >
                  <Image
                    src={imageUrl(index) || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTc3NUMiPlVwbG9hZCBQcm9wZXJ0eSBJbWFnZTwvdGV4dD48L3N2Zz4="}
                    alt={imageUrl(index) ? "Property Image" : "Upload Property Image"}
                    fill={true}
                    className="rounded-lg object-contain"
                    priority
                  />
                </div>

                {/* for input and label */}
                <div className="border-gray-300 flex w-full flex-col items-start justify-around rounded-lg border-2 bg-white p-[6px] shadow-md md:w-[60%] md:flex-row md:items-center">
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="my-1 block cursor-pointer text-sm font-semibold"
                  >
                    {index === 0 ? 'Upload Main Image' : 'Upload Additional Image'}
                  </label>
                  <input
                    type="file"
                    id={`file-upload-${index}`}
                    key={field.id}
                    {...register(`images.${index}` as const, {
                      required: isUpdate ? false : index === 0,
                    })}
                  ></input>

                  {/* donot render this button for 1st index */}
                  {index != 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="border-gray-400 rounded-lg border-2 hover:bg-red-300"
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

          {/* Show add button when main image exists */}
          {imageUrl(0) && (
            <button
              type="button"
              onClick={() => append({ image: '' })}
              className="flex items-center gap-2 rounded-lg bg-[#99775C] p-2 px-4 text-white transition-all duration-300 hover:bg-[#886a52] hover:shadow-lg"
            >
              <AiOutlinePlus className="h-6 w-6" />
              <span className="text-sm font-medium">Add More Images</span>
            </button>
          )}
        </div>

        <div className="border-gray-200 w-full rounded-lg border-2 bg-white p-4 shadow-lg">
          <div className="my-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <label className=" my-1 block text-sm font-semibold">
                Property Title
              </label>
              <input
                type="text"
                placeholder="PropertyName"
                className={inputStyle}
                {...register('name', {
                  required: "Property name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" }
                })}
              />
              {errors.name && (
                <ErrorText text={errors.name.message || "Please Enter Valid PropertyName"} />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Property Type
              </label>
              <select
                className={inputStyle}
                {...register('propertyType', { required: "Property type is required" })}
              >
                {propertyOptions.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {errors.propertyType && (
                <ErrorText text={errors.propertyType.message || "Select Property Type Pls"} />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">
                Usd Rate/Night
              </label>
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                {...register('rate', {
                  required: "Rate is required",
                  min: { value: 1, message: "Rate must be at least 1" },
                  valueAsNumber: true
                })}
              />
              {errors.rate && <ErrorText text={errors.rate.message || "Please Enter Valid Price"} />}
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
                {...register('country', { required: "Country is required" })}
              >
                <option value={defaultValues.country}>
                  {defaultValues.country == ''
                    ? 'Select a Country'
                    : defaultValues.country}
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={index}>
                    {country.name}
                  </option>
                ))}
              </select>

              {errors?.country && (
                <ErrorText text={errors.country.message || "Please Select Valid Country"} />
              )}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">State </label>
              <select
                className={inputStyle}
                {...register('state', { required: "State is required" })}
              >
                <option value={defaultValues.state}>
                  {defaultValues.state == ''
                    ? 'Select a state'
                    : defaultValues.state}
                </option>
                {countryhook
                  .getStates(parseInt(watch('country')))
                  .map((state, index) => (
                    <option key={index} value={index}>
                      {state.name}
                    </option>
                  ))}
              </select>
              {errors?.state && <ErrorText text={errors.state.message || "Please Select Valid State"} />}
            </div>

            <div className="w-full">
              <label className="my-1 block text-sm font-semibold">City</label>
              <select
                className={inputStyle}
                {...register('city', { required: "City is required" })}
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
                  .map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
              {errors?.city && <ErrorText text={errors.city.message || "Please Select Valid City"} />}
            </div>
          </div>
        </div>

        <div className="border-gray-200 my-4 w-full rounded-lg border-2 bg-white p-4 shadow-lg">
          <div className="w-full">
            <label className="my-1 block text-sm font-semibold">
              Property Description
            </label>
            <textarea
              rows={5}
              placeholder="Description"
              className={inputStyle}
              {...register('discription', {
                required: "Description is required",
                minLength: { value: 15, message: "Description must be at least 15 characters" }
              })}
            ></textarea>

            {errors.discription && (
              <ErrorText text={errors.discription.message || "Please Enter Valid Property Description"} />
            )}
          </div>

          <div className="my-2 w-full">
            <label className="my-1 block text-sm font-semibold">Rules</label>
            <textarea
              rows={5}
              placeholder="Rules"
              className={inputStyle}
              {...register('rules', {
                required: "Rules are required",
                minLength: { value: 5, message: "Rules must be at least 5 characters" }
              })}
            ></textarea>

            {errors.rules && <ErrorText text={errors.rules.message || "Please Enter Rules/Criteria"} />}
          </div>
        </div>

        {/* checkBox */}
        <div className="w-full ">
          <div className=" border-gray-200 mx-auto rounded-lg  border-2 bg-white p-4 shadow-lg  hover:bg-hoverColor ">
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
                    <label className="text-gray-600 mx-2 text-sm">
                      {items}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </form>

      <hr className="border-gray-400 my-5" />

      <div className="w-full rounded-lg bg-slate-100 p-4">
        <div className="mx-auto flex w-[97%] items-center justify-between">
          <button
            type="button"
            className="relative text-md font-semibold text-gray-700 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 after:ease-out hover:text-red-500 hover:after:origin-bottom-left hover:after:scale-x-100"
            onClick={(e) => {
              e.preventDefault()
              list.onList('close')
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-md relative overflow-hidden rounded-md bg-[#99775C] px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#99775C]/50 active:scale-95 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-[#886a52] before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </div>    </main>
  )
}

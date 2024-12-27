'use client'

import { useState } from 'react'
import {AiFillStar} from 'react-icons/ai'
import { ErrorText } from './random';
import { FetchedMe} from '../interface/response';
import Api from '../api/client/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useConfirm from '../store/useConfirm';
import useModal from '../store/useModal';
import Image from 'next/image';


interface Props{
  userData:Partial<FetchedMe>,
  propertyId:string,
  reviewId?:string,
  setEdit?:React.Dispatch<React.SetStateAction<string>>;
  edit:boolean
  rating:number,
  Review:string
}

export default function ReviewInput({userData,propertyId,edit,rating,Review,setEdit,reviewId}:Props) {
  const [rate, setrate] = useState(rating-1)
  const [review,setreview]=useState(Review);
  const [err,seterr]=useState(false);
  const router=useRouter()
  const confirm=useConfirm();
  const modal=useModal();
  

  const ratings = [1, 2, 3, 4, 5]
  return (
    <main className="my-3">
      <div>
        <div className="flex w-full items-center gap-x-3 ">
          <Image height={48} width={48} src={userData.profileImg!.imgUrl==''?"/user.png":userData.profileImg!.imgUrl} alt="User" className={`block h-12 w-12 ${edit? 'rounded-lg':'rounded-full'}`} />
          <p>
            <span className="text-md block font-semibold">{userData.userName}</span>
            <span className="text-sm text-gray-700 ">{new Date(userData.createdAt!).getFullYear()}</span>
          </p>
        </div>

        {/* rating stars */}
        <div className='my-2 mt-3'>
          {ratings.map((ratevalue,index) => {
            return (
              <button
              key={index}
                onClick={(e) => {
                  setrate(index)
                 
                }}
              >
                <AiFillStar className={
                    index<=rate
                      ? 'h-6  w-6 fill-themeColor stroke-gray-100'
                      : 'h-6 w-6 fill-gray-400  stroke-gray-300  transition-all  hover:fill-themeColor'
                  }/>
                
                
              </button>
            )
          })}
        </div>
        <form>
          <label className="mb-2 mt-2 block text-left text-sm font-medium text-gray-900 dark:text-white">
            Your Review
          </label>
          <textarea
            id="message"
            rows={4}
            className="block w-full rounded-lg border my-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Leave a comment..."
            defaultValue={review}
            onChange={(e)=>setreview(e.target.value)}
          ></textarea>

          {err&&<ErrorText  text='Please Provide rating and review Both!'/>}

          <div className=' flex  justify-between items-center'>
          {edit&&<button className='text-md font-semibold underline' 
          
          onClick={(e)=>{
            setEdit!('');
          }}>Cancel</button>}
          <button type='button' className="my-3   block rounded-lg font-semibold bg-themeColor p-2 px-3 text-center text-sm text-white hover:bg-mainColor"
          onClick={(e)=>{
            e.preventDefault;
            const newrate=rate+1
            if(newrate<1||review.length<=2){
              return seterr(true)
            }
          
          const onSubmit=()=>{
            if(!edit){
              Api.post(`/property/v1/review/${propertyId}`,{rating:newrate,review},{withCredentials:true}).then((res)=>{
                toast.success("Review Posted Successfully!!");
                setrate(0);
                setreview('')
                router.refresh()
                return modal.onClose()
              }).catch((e)=>{
                toast.error("Failed to Post Review!!!");
                return modal.onClose();
              })
            }

            if(edit){
              Api.patch(`/property/v1/review/${reviewId}`,{rating:newrate,review},{withCredentials:true}).then((res)=>{
                toast.success("Review updated Successfully!!");
                router.refresh()
                setEdit!('')
                return modal.onClose()
              }).catch((e)=>{
                toast.error("Failed to update Review!!!");
                return modal.onClose();
              })
            }
          }

          //change confirmation

          confirm.onContent({
            header:"Are You Sure To Post Review",
            actionBtn:"Submit Review",
            onAction:onSubmit
          })

          modal.onOpen('confirm');


          }}
          >
            Submit
          </button>
          </div>
          
        </form>
      </div>
    </main>
  )
}

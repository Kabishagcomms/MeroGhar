'use client'

import Image from 'next/image'
import {useState} from 'react'
interface Props{
    images:{
        imgId:string,
        imgUrl:string
    }[]
}

export default function Carousel({images}:Props){

    const [img,setimg]=useState(0)

    return(
    <div  className="relative z-10 w-full mx-auto my-2">
    
    <div className="relative h-[250px] sm:h-[324px] overflow-hidden rounded-lg md:h-96 ">
        
        <div className="duration-700 ease-in-out " >
            <Image fill={true} src={images[img]!.imgUrl} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
        </div>
    </div>
   
    <div className="absolute  flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        <button type="button" className="w-3 h-3 rounded-full" ></button>
        
    </div>
   
    <button onClick={() => {
            if (img == 0) {
              return console.log('o here')
            }
            return setimg(img - 1)
          }} type="button" className="absolute top-0 left-0  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hover:transition-all" >
       
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>

    <button onClick={() => {
            if (img == images?.length! - 1) {
              return console.log('o here')
            }
            return setimg(img + 1)
          }} type="button" className="absolute top-0 right-0  flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="sr-only">Next</span>
        </span>
    </button>

    <div className="absolute bottom-2 flex justify-center w-full">
      <div className="flex items-center space-x-1">
        {[...Array(images?.length || 0)].map((_, index) => (
          <svg
            key={index}
            className={`w-2 h-2 ${
              img === index ? 'fill-white' : 'fill-gray-500'
            }`}
            viewBox="0 0 8 8"
           
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
        ))}
      </div>
    </div>
</div>
    )
}
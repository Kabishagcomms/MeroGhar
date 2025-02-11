'use client'

import Image from 'next/image'
import { useState } from 'react'
interface Props {
  images: {
    imgId: string
    imgUrl: string
  }[]
}

export default function Carousel({ images }: Props) {
  const [img, setimg] = useState(0)

  return (
    <div className="relative z-10 mx-auto my-2 w-full">
      <div className="relative h-[250px] overflow-hidden rounded-lg sm:h-[324px] md:h-96 ">
        <div className="duration-700 ease-in-out ">
          <Image
            fill={true}
            src={images[img]!.imgUrl}
            className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
            alt="..."
          />
        </div>
      </div>

      <div className="absolute  bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
        <button type="button" className="h-3 w-3 rounded-full"></button>
      </div>

      <button
        onClick={() => {
          if (img == 0) {
            return console.log('o here')
          }
          return setimg(img - 1)
        }}
        type="button"
        className="group absolute top-0  left-0 flex h-full cursor-pointer items-center justify-center px-4 hover:transition-all focus:outline-none"
      >
        <span className="dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10">
          <svg
            className="dark:text-gray-800 h-5 w-5 text-white sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        onClick={() => {
          if (img == images?.length! - 1) {
            return console.log('o here')
          }
          return setimg(img + 1)
        }}
        type="button"
        className="group absolute top-0  right-0 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      >
        <span className="dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10">
          <svg
            aria-hidden="true"
            className="dark:text-gray-800 h-5 w-5 text-white sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>

      <div className="absolute bottom-2 flex w-full justify-center">
        <div className="flex items-center space-x-1">
          {[...Array(images?.length || 0)].map((_, index) => (
            <svg
              key={index}
              className={`h-2 w-2 ${
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

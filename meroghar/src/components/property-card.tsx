"use client"

import Card from "@/components/card/card"
import { motion } from 'framer-motion'

import { Property, wishlist } from '../interface/response'
import { SessionUser } from '../api/server/auth'


interface CarouselProps {
    properties: Partial<Property>[]
    userData: SessionUser
    wishList?: wishlist
  }
  

export default function PropertyCard({ properties, userData, wishList }: CarouselProps) {

  console.log(properties,userData,wishList)

    

    return (
        <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Featured Properties</h1>
          </div>
        </header>
  
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {properties.map((property, index) => {
                const inwish = wishList?.wishList.some(
                  (data) => data._id == property._id
                ) || false
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      use="card"
                      key={index}
                      wish={inwish}
                      data={property}
                      user={
                        (userData.is_Admin && 'admin') ||
                        (userData.docId == property.userId && 'owner') ||
                        (userData.docId == '' && '') ||
                        'user'
                      }
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    )
}
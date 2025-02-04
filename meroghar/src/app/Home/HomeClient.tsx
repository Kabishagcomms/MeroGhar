'use client'

import { SessionUser } from '../../api/server/auth'
import Card from '../../components/card/card'
import { Property, wishlist } from '../../interface/response'
interface HomeProps {
  properties: Partial<Property>[]
  wishList?: wishlist
  userData: SessionUser
}
import HeroSection from '@/components/HeroSection'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function HomeClient({ properties, wishList, userData }: HomeProps) {
  const router = useRouter()

  useEffect(() => {
    return router.refresh()
  }, [])

  if (wishList) {
    return (
      <main className="w-full    ">
        <HeroSection />
        {/* for Property Viwed By users */}
        <div className="mx-auto w-[95%] ">
          {properties.length == 0 && (
            <h1 className="my-5 text-center text-lg  font-semibold md:text-xl ">
              No Properties To Display!
            </h1>
          )}

          <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {properties.map((property, index) => {
              //check if the wishlist matched the proeprty id
              const inwish = wishList!.wishList.some(
                (data) => data._id == property._id
              )
              return (
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
              )
            })}
          </div>

          {properties.length >= 8 && (
            <button className="mx-auto rounded-lg border border-white bg-themeColor px-3 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-mainColor ">
              LoadMore
            </button>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="w-full     ">
      <HeroSection />
      {/* for Property Viwed By users */}
      <div className="mx-auto  w-[95%]">
        {properties.length == 0 && (
          <h1 className="my-5 text-center text-lg  font-semibold md:text-xl ">
            No Properties To Display!
          </h1>
        )}

        <div className="my-3 grid w-full grid-cols-1 gap-x-2 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {properties.map((property, index) => {
            return (
              <>
                <main>
                  <HeroSection />
                  <Card
                    use="card"
                    key={index}
                    wish={false}
                    data={property}
                    user={userData.is_Admin ? 'admin' : ''}
                  />
                </main>
              </>
            )
          })}
        </div>

        {properties.length >= 8 && (
          <button className="mx-auto rounded-lg border border-white bg-themeColor px-3 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-mainColor ">
            LoadMore
          </button>
        )}
      </div>
    </main>
  )
}

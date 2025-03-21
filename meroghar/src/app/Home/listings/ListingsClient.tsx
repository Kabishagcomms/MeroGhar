'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ClientComp from '../../../components/clientComp'
import { motion } from 'framer-motion'
import Card from '../../../components/card/card'
import CategoryBar from '../../../components/categorybar'
import { Property, wishlist } from '../../../interface/response'
import { SearchForm } from '../../../components/modals/searchModal'
import { SessionUser } from '../../../api/server/auth'

interface ListingsClientProps {
  properties: Partial<Property>[]
  session: boolean
  userData: SessionUser
  wishList: wishlist | null
  searchParams: SearchForm
}

export default function ListingsClient({ 
  properties, 
  session, 
  userData, 
  wishList,
  searchParams 
}: ListingsClientProps) {
  const router = useRouter()
  const params = useSearchParams()
  const [isLoading, setIsLoading] = useState(params.get('loading') === 'true')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Filter properties based on selected category
  const filteredProperties = selectedCategory
    ? properties.filter(property => 
        property.propertyType?.toLowerCase() === selectedCategory.replace(/-/g, ' ')
      )
    : properties

  // Remove the loading parameter from URL once component is mounted
  useEffect(() => {
    if (isLoading) {
      // Create a small delay to show the spinner
      const timer = setTimeout(() => {
        setIsLoading(false)
        
        // Remove the loading parameter from URL
        const newParams = new URLSearchParams(params.toString())
        newParams.delete('loading')
        
        const newUrl = window.location.pathname + 
          (newParams.toString() ? `?${newParams.toString()}` : '')
        
        router.replace(newUrl, )
      }, 800) // Show spinner for 800ms
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, params, router])

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <ClientComp>
      <div className="min-h-screen bg-[#EAE7DD]">
        <div className="border-b border-gray-200 pb-4">
          <CategoryBar onCategorySelect={handleCategorySelect} />
        </div>
        
        <header>
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {Object.keys(searchParams).length > 0 && (
              <p className="text-sm text-gray-500">Showing filtered results</p>
            )}
            {selectedCategory && (
              <p className="text-sm text-gray-500 mt-2 text-rubik">
                Filtered by: {selectedCategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </p>
            )}
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#59b077]"></div>
                <p className="ml-4 text-lg text-gray-600">Loading properties...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property, index) => {
                    const inwish = wishList?.wishList.some(
                      (data) => data._id == property._id
                    ) || false
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        className="h-full "
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
                  })
                ) : (
                  <div className="col-span-full text-center py-10">
                    <h2 className="text-xl font-semibold text-gray-700">No properties found</h2>
                    <p className="text-gray-500 mt-2">
                      {selectedCategory 
                        ? `No properties available in the ${selectedCategory.replace(/-/g, ' ')} category` 
                        : 'Try adjusting your search criteria'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </ClientComp>
  );
}
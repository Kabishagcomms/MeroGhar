import { checkSession } from '../../../api/server/auth'
import { getProperties } from '../../../api/server/property/getProperty'
import { getFavourites } from '../../../api/server/property/getwishlist'
import { SearchForm } from '../../../components/modals/searchModal'
import ClientComp from '../../../components/clientComp'
import PropertyCard from '@/components/property-card'



interface HomeProps {
    searchParams: SearchForm
  }
  


export default async function Properties({ searchParams }: HomeProps) {

    const properties = await getProperties(1, 10, searchParams)
  const { session, userData } = await checkSession()

 

  if (!session || userData.is_Admin) {
    
    return (
        <ClientComp>
      <PropertyCard properties={properties} userData={userData}  />
      </ClientComp>
    )
  }

  const wishList = await getFavourites(1, 20)

  return (
    <ClientComp>
      <PropertyCard properties={properties} userData={userData} wishList={wishList} />
      </ClientComp>
  )


}
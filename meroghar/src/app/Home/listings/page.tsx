import ListingsClient from './ListingsClient'
import { checkSession } from '../../../api/server/auth'
import { getProperties } from '../../../api/server/property/getProperty'
import { getFavourites } from '../../../api/server/property/getwishlist'
import { SearchForm } from '../../../components/modals/searchModal'

interface ListingsProps {
  searchParams: SearchForm
}

export default async function ListingsPage({ searchParams }: ListingsProps) {
  // This is already passing searchParams to getProperties
  const properties = await getProperties(1, 10, searchParams)
  const { session, userData } = await checkSession()
  const wishList = !session || userData.is_Admin ? null : await getFavourites(1, 20)

  return (
    <ListingsClient 
      properties={properties}
      session={session}
      userData={userData}
      wishList={wishList}
      searchParams={searchParams}
    />
  )
}
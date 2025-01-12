import { SearchForm } from '../../components/modals/searchModal'
import ClientComp from '../../components/clientComp'
import { checkSession } from '../../api/server/auth'

import { HomeClient } from './HomeClient'

export default async function Home() {
  const { session, userData } = await checkSession()

  //for admin since admin/non logged no wishlist

  if (!session || userData.is_Admin)
    return (
      <ClientComp>
        <div>No Rooms Available.</div>
      </ClientComp>
    )

  //user exclusiven wishlist which needs to be checked

  return (
    <ClientComp>
      <div>hi</div>
    </ClientComp>
  )
}

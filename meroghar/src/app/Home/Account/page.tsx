import AccountComponent from '../../../components/user/account'
import { checkSession } from '../../../api/server/auth'
import ClientComp from '../../../components/clientComp'
import { getMe } from '../../../api/server/user/getUser'
import Profile from '../../../components/user/profile'

export default async function AccountSetting() {
  console.log('Welcome to admin page')
  const { session, userData } = await checkSession()

  const user = await getMe()

  return (
    <ClientComp>
      <Profile
        userId={session ? userData.docId : ''}
        profileData={user}
        is_Admin={false}
      />
    </ClientComp>
  )
}

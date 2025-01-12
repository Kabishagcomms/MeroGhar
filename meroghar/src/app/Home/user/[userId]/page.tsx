import Profile from '../../../../components/user/profile'
import { getMe, getUser, getUserKyc } from '../../../../api/server/user/getUser'
import { checkSession } from '../../../../api/server/auth'
import ClientComp from '../../../../components/clientComp'
type Params = {
  params: {
    userId: string
  }
}

export default async function UserProfile({ params: { userId } }: Params) {
  const { session, userData } = await checkSession()

  if (userData.docId == userId) {
    const myInfo = await getMe()
    return (
      <ClientComp>
        <main className="mx-auto  w-[98%]  rounded-lg sm:w-[90%] lg:w-[80%]">
          <Profile
            userId={session ? userData.docId : ''}
            profileData={myInfo}
            is_Admin={userData.is_Admin}
          />
        </main>
      </ClientComp>
    )
  }

  if (userData.is_Admin) {
    const user = await getUserKyc(userId)
    return (
      <ClientComp>
        <main className="mx-auto  w-[98%]  rounded-lg sm:w-[90%] lg:w-[80%]">
          <Profile
            userId={session ? userData.docId : ''}
            profileData={user}
            is_Admin={userData.is_Admin}
          />
        </main>
      </ClientComp>
    )
  }

  const userProfileData = await getUser(userId)
  return (
    <ClientComp>
      <main className="mx-auto  w-[98%]  rounded-lg sm:w-[90%] lg:w-[80%]">
        <Profile
          userId={session ? userData.docId : ''}
          profileData={userProfileData}
          is_Admin={userData.is_Admin}
        />
      </main>
    </ClientComp>
  )
}

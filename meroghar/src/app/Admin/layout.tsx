import SideBar from '../../components/navbar/sidebar'
import DashboardNav from '../../components/navbar/DashboardNav'
import ClientComp from '../../components/clientComp'
import { checkSession } from '../../api/server/auth'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, userData } = await checkSession()

  if (!session) return redirect('/')
  if (!userData.is_Admin) return redirect('/')

  return (
    <main className=" flex flex-col">
      <ClientComp>
        <DashboardNav />
      </ClientComp>

      {/* this children represents each page component  that is rendered */}
      <main className=" my-24 ml-0  md:my-10 md:ml-[230px] lg:ml-[260px]">
        {children}
      </main>

      <ClientComp>
        <SideBar is_Admin={userData.is_Admin} menu={false} />
      </ClientComp>
    </main>
  )
}

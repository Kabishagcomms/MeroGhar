import { redirect } from 'next/navigation'
import { checkSession } from '../../../../api/server/auth'


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, userData } = await checkSession()

  if (!session) return redirect('/')
  if (userData.is_Admin) return redirect('/')

  return (
    <main className=" flex flex-col">
      {/* this children represents each page component  that is rendered */}
      <div className={`mx-auto  w-[98%]  rounded-lg sm:w-[90%] lg:w-[85%]`}>
        {children}
      </div>

   
    </main>
  )
}

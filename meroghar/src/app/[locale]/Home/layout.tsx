

import { checkSession } from '../../../api/server/auth';
import ClientComp from '../../../components/clientComp';
import NavBar from '../../../components/navbar/navbar';
import { cookies } from 'next/headers';

export default async function Layout({children}: {children: React.ReactNode}) {
  const {session,userData}=await checkSession()
  const cookieStore=cookies();
  const theme=cookieStore.get("theme")?.value||'light'

  return (
    <main className='flex min-h-screen flex-col bg-mainColor'>
      <ClientComp>
        <NavBar authState={session} img={userData.img} theme={theme} is_Admin={userData.is_Admin} />
      </ClientComp>
      
      <main className='flex-1 mt-[90px]'>
        {children}
      </main>
    </main>
  )
}

import getDashBoardData from '../../api/server/property/getdashboard'

import ClientComp from '../../components/clientComp'
import DashClient from './dashClient'

export default async function Dashboard() {
  const { totalUsers, activeUsers } = await getDashBoardData()

  return (
    <main className="w-full">
      <ClientComp>
        <DashClient totalUsers={totalUsers} activeUsers={activeUsers} />
      </ClientComp>
    </main>
  )
}

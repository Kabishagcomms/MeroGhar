
import getDashBoardData from '../../api/server/property/getdashboard';

import ClientComp from '../../components/clientComp';
import DashClient from './dashClient';



export default async  function Dashboard(){
    const {totalUsers,activeUsers,totalBookings,totalProperties,activeBookings,activeProperties,properties}=await getDashBoardData()

    return(
      <main className='w-full'>

        <ClientComp>
        <DashClient totalBookings={totalBookings} totalProperties={totalProperties} totalUsers={totalUsers} activeBookings={activeBookings} activeProperties={activeProperties} activeUsers={activeUsers} properties={properties} />
        </ClientComp>

      </main>
    )
}
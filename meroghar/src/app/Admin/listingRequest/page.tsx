
import { checkSession } from '../../../api/server/auth'
import ClientComp from '../../../components/clientComp'
import ListingComp from '../../../components/listing/listingcomp'
import {
  getPropertyRequests,
} from '../../../api/server/property/getProperty'

export default async function UserListing() {
    const properties = await getPropertyRequests(1, 10)

    if(properties.length==0){
      return(
        
          <h1 className='text-center font-semibold text-lg md:text-xl md:font-bold'>
            No Properties to Verify!
          </h1>
     
      )
    }

    return (
     
        <ClientComp>
          <ListingComp is_Admin={true} properties={properties} />
        </ClientComp>
     
    )
  


}

import ClientComp from '../../../components/clientComp'
import ListingComp from '../../../components/listing/listingcomp'
import { getPropertyRequests } from '../../../api/server/property/getProperty'
import { FaHome } from 'react-icons/fa'

export default async function UserListing() {
  const properties = await getPropertyRequests(1, 10)

  if (properties.length == 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#EAE7DD]">
        <div className="mb-6 rounded-full bg-[#99775C] p-6 text-white">
          <FaHome className="h-16 w-16" />
        </div>
        <h1 className="mb-3 text-center text-2xl font-bold text-[#99775C]">
          No Properties to Verify!
        </h1>
        <p className="text-center text-[#886a52]">
          All property listings have been processed. Check back later for new submissions.
        </p>
      </div>
    )
  }

  return (
    <ClientComp>
      <ListingComp is_Admin={true} properties={properties} />
    </ClientComp>
  )
}

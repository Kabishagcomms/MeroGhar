
import { checkSession } from "../../../../api/server/auth";
import { getMyProperties } from "../../../../api/server/property/getProperty"
import ClientComp from "../../../../components/clientComp";
import ListingComp from "../../../../components/listing/listingcomp";


export default async function Listing(){
    const {session,userData}=await checkSession()
    const properties=await getMyProperties(userData.docId,1,10);
    

    return(
        <ClientComp>
            <div className="mx-auto ">
            <ListingComp is_Admin={false} properties={properties} kycVerified={userData.kycVerified} />
            </div>
           
        </ClientComp>
    )
}
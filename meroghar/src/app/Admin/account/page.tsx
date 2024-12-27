

import ClientComp from "../../../components/clientComp";
import { getMe } from "../../../api/server/user/getUser";
import Profile from "../../../components/user/profile";
import { checkSession } from "../../../api/server/auth";





export default async function AccountSetting(){
  const session=await checkSession();
  const userData= await getMe();
 

    return(
    

      <ClientComp>
      <div className={`mx-auto my-5 rounded-lg  w-[95%] sm:w-[90%] lg:w-[95%]`}  >
      <Profile userId={session.session?session.userData.docId:""} profileData={userData} is_Admin={true} listings={[]} />
      </div>
      </ClientComp>
      


    )
}
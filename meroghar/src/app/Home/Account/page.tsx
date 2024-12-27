import AccountComponent from "../../../components/user/account";
import { checkSession } from "../../../api/server/auth";
import ClientComp from "../../../components/clientComp";
import { getMe } from "../../../api/server/user/getUser";
import Profile from "../../../components/user/profile";
import { getMyProperties } from "../../../api/server/property/getProperty";






export default async function AccountSetting(){

  console.log("Welcome to admin page")
  const {session,userData}=await checkSession();

  const user= await getMe();
  const listings=await getMyProperties(userData.docId,1,5)

    return(
    


    <ClientComp>
   
    <Profile userId={session?userData.docId:""} profileData={user} listings={listings} is_Admin={false} />
   
    </ClientComp>
    
    
  
   
      
   
    
   

    )
}
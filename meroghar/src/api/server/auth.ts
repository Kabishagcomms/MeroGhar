import 'server-only'


import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


//for protected routes that canbe acessed by user/admin
export const authCheck=async(is_Admin:boolean)=>{
  try{
    const cookieStore = cookies();
    const session = cookieStore.get('session')?.value
    console.log('sessioninpage',session)
    if(!session){
        return redirect('/')
    }
    const sessionObj=await JSON.parse(session!)
    console.log("poagesobj",sessionObj)
    if(sessionObj.is_Admin!==is_Admin) {
      console.log(is_Admin)
        if(is_Admin)  return redirect('/admin');
        return redirect('/')
    }
  }catch(e){
    console.log(e)
  }
}

export interface SessionUser{
  docId:string,
  userId:string,
  is_Admin:boolean,
  img:string,
  kycVerified:boolean
}


export interface sessionData{
  session:boolean,
  userData:SessionUser
}


//for common routes can only be accessed by user/non user
export const checkSession = async (): Promise<sessionData> => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");
  
  // If no session cookie exists at all
  if (!sessionCookie || !sessionCookie.value) {
    console.log("no session");
    return {
      session: false,
      userData: {
        userId: "",
        is_Admin: false,
        img: '',
        docId: "",
        kycVerified: false
      }
    };
  }

  try {
    // Parse the session value safely
    const sessionObj = JSON.parse(sessionCookie.value);
    console.log("session checked session obj: ", sessionObj);
    
    return {
      session: true,
      userData: {
        docId: sessionObj.docId,
        userId: sessionObj.userId,
        is_Admin: sessionObj.is_Admin,
        img: sessionObj.img,
        kycVerified: sessionObj.kycVerified
      }
    };
  } catch (error) {
    // Handle the case where the session cookie exists but contains invalid JSON
    console.error("Invalid session format:", error);
    return {
      session: false,
      userData: {
        userId: "",
        is_Admin: false,
        img: '',
        docId: "",
        kycVerified: false
      }
    };
  }
};




// used for server side auth data fetching
export const getAccessToken=()=>{
  try{
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value
    if(!accessToken) throw new Error("no access token");
    const cookie=`accessToken=${accessToken}`
    console.log(cookie)
    return cookie;
  }catch(e){
    console.log(e);
    return '';
  }
}
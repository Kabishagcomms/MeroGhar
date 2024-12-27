import ClientComp from "../../../components/clientComp";
import PasswordReset from "../../../components/fogotpassword";



export default function ForgotPassword(){
    return(
        <main className="w-full my-10 flex justify-center items-center">
            <ClientComp>
            <PasswordReset />
            </ClientComp>
           
        </main>
    )
}
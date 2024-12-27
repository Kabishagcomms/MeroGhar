import { getAllUsers } from "../../../api/server/user/getUser";
import AdminTable from "../../../components/admin/table";
import ClientComp from "../../../components/clientComp";

export default  async function UsersList(){

    const users=await  getAllUsers(1,10);
    if(users.length===0){
        return(
         
            <h1 className="text-lg md:text-xl font-semibold md:font-bold text-center"> No Users To Display !!!</h1>
          
        )
      }


    return(
        <main className="mx-auto w-[98%]">
            <ClientComp>
                <AdminTable use="user" users={users} properties={[]} bookings={[]} />
            </ClientComp>
        </main>
    )
    
        
          
      
}
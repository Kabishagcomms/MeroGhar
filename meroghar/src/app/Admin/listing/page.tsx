import { getAllProperties } from "../../../api/server/property/getProperty";
import AdminTable from "../../../components/admin/table";
import ClientComp from "../../../components/clientComp";

export default  async function PropertyList(){

    const properties=await  getAllProperties(1,10)
    if(properties.length===0){
        return(
         
            <h1 className="text-lg md:text-xl font-semibold md:font-bold text-center"> No Properties To Display !!!</h1>
          
        )
      }


    return(
        <main className="mx-auto w-[98%]">
            <ClientComp>
                <AdminTable use="property" users={[]} properties={properties} bookings={[]} />
            </ClientComp>
        </main>
    )
    
        
          
      
}
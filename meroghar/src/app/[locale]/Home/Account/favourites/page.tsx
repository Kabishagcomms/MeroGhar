import { getFavourites } from "../../../../../api/server/property/getwishlist"
import Link from 'next/link'
import Card from "../../../../../components/card/card";
import ClientComp from "../../../../../components/clientComp";

export default async function Favourites(){
    const wishList=await getFavourites(1,10);
    
    return(
        <main>
            <h1 className="text-lg my-3 sm:text-2xl text-[#886a52] text-rubik font-semibold">Your Favourites!</h1>
            {wishList.wishList.length<=0&&<div >
               <p className="mt-3 mb-8 text-md text-gray-600 font-semibold"> No Properties Added to Favourites!!!
                </p>
             <Link 
                href={'/Home'} 
                className="font-semibold p-3 px-5 transition-all duration-300 text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary)] hover:text-white hover:scale-105 hover:shadow-md relative overflow-hidden group"
             >
                <span className="relative z-10">Start Searching</span>
                <span className="absolute inset-0 bg-[var(--color-secondary-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
             </Link>
            </div>}
            
          { wishList.wishList.length>=1&&<div className="my-4 grid gap-2 gap-x-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ClientComp>
            {
                wishList.wishList.map((data,index)=>{
                    
                    return(
                        <Card data={data} key={index} use="card" wish={true}/>
                    )
                })
            }
            </ClientComp>
           
            </div>}
            
        </main>
    )
}
'use client'

import useModal from "../store/useModal"

interface Props{
    Header:string,
    header2:string,
    header3:string,
}

export function NoAuth({Header,header2,header3}:Props){

    const modal=useModal();

    const handleClick=()=>{
        modal.onOpen('login')
    }
    return(
        <div className="my-8">
        <h1 className="text-3xl font-bold mb-5">
            {Header}
        </h1>

        <h2 className="text-xl  mb-4 font-semibold ">{header2}</h2>
        <h3 className='text-sm mb-8  text-gray-600'>{header3}</h3>
        <button onClick={handleClick}  className="text-white font-semibold p-3 px-5 transition-all bg-themeColor rounded-lg hover:bg-mainColor">Log in</button>
    </div>
    )
}
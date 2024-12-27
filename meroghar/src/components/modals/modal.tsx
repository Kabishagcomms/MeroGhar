'use client';

import { useEffect, useState } from "react";

import useModal from "../../store/useModal";
import { createRef } from "react";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'


interface modalProps{
    isOpen?:string
    children?:React.ReactElement
}

function Modal({isOpen,children}:modalProps) {
  const modal=useModal();

  const [showModal, setShowModal] = useState(isOpen);
  const modalRef=createRef<HTMLDivElement>();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  
  useEffect(() => {
    const clickHandler = (e: any) => {
      //if event click is outsise the div ref of the modal clsoe modal
      if (!modalRef.current?.contains(e.target)) {
        return modal.onClose()
      }
     
    }
    document.addEventListener('mousedown', clickHandler)
    
    return () => {
      document.removeEventListener('mousedown', clickHandler)
    }
  });



  if(isOpen=='close'){
    return null;
  }
  return (
      <div>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
         
        "
      >
        <div className={`relative 
          w-full
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          z-50 
         flex
         items-center
         justify-center
        
         translate
            duration-300
          
          ${isOpen!='close' ? 'translate-y-0' : 'translate-y-full'}
          ${isOpen!='close' ? 'opacity-100' : 'opacity-0'}`}
          
          
          
        >
        
      { modal.isLoading&&<AiOutlineLoading3Quarters className="absolute bottom-10  animate-spin h-8 w-8 fill-themeColor" />}
     
      {/* this modal container is perfect for all conditio try to make the child component width fixed for md and for smaller full according to parent div */}

    {/* container for modal with ref to not close and have size of modal */}
     <div ref={modalRef} className=" w-[95%] h-fit  sm:w-[80%] md:w-fit">
     {children}
     </div>


    
     
    
    
      
      </div>
    </div>
      </div>
  )
}

export default Modal;
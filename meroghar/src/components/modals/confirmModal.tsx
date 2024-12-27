'use client'

import useModal from "../../store/useModal"

import useConfirm from "../../store/useConfirm";

import { RxCross1 } from "react-icons/rx";

import Modal from "./modal"

export function ConfirmModal(){
    const modal=useModal()
    const confirm=useConfirm();
    if(modal.isOpen!='confirm'){
        return null;
    }
    return(
        <>
        <Modal isOpen={modal.isOpen}>
              
        <div className="w-full border-2 border-blue-500 md:w-[570px]  rounded-lg bg-white px-4 pt-5 pb-4   shadow-xl  ">
            <div className="flex items-center justify-end ">
              <button onClick={()=>{
                  
                  modal.onClose();
              }}><RxCross1 className="h-5 w-5 rounded-full hover:bg-slate-200" /></button>
            </div>
  
            {/* <hr className='border-[1px] border-gray-300 my-2' /> */}
  
            <h2 className="my-8 text-center text-xl font-bold text-gray-700">
              {confirm.content.header}
            </h2>
  
            <div className="flex justify-around">
              <button className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-all hover:bg-gray-800"
              
              onClick={()=>{
                modal.onClose();
                 
              }}>
                Cancel
              </button>
              <button className={`rounded-lg  px-4 py-2 text-white transition-all ${confirm.content.actionBtn=='Delete'? 'bg-red-500 hover:bg-red-700' :'bg-themeColor hover:bg-mainColor'}`}
              onClick={(e)=>{
                e.preventDefault();
                confirm.content.onAction();
              }}
              >
                {confirm.content.actionBtn}
              </button>
            </div>
          </div>
        </Modal>
        
        </>
    )
}


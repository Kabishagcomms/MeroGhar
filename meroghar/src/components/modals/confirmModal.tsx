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
        <div className="w-full md:w-[450px] rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-end">
              <button 
                onClick={() => modal.onClose()}
                className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
              >
                <RxCross1 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
  
            <h2 className="mt-2 mb-6 text-center text-2xl font-semibold text-gray-800">
              {confirm.content.header}
            </h2>
  
            <div className="flex flex-col items-center justify-center gap-4">
              <button 
                className={`w-full rounded-lg px-6 py-3 text-white font-medium transition-all ${
                  confirm.content.actionBtn === 'Delete' 
                    ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' 
                    : 'bg-[#99775C] hover:bg-[#886a52] active:bg-[#775c44]'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  confirm.content.onAction();
                }}
              >
                {confirm.content.actionBtn}
              </button>
              
              <button 
                className="w-full rounded-lg px-6 py-3 text-gray-600 font-medium border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-all"
                onClick={() => modal.onClose()}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        </>
    )
}


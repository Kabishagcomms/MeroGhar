'use client'

import useModal from "../../store/useModal"
import PasswordReset from "../fogotpassword"



import Modal from "./modal"

export function ResetPassword(){
    const modal=useModal()
    if(modal.isOpen!='forgot'){
        return null;
    }
    return(
        <>
        <Modal isOpen={modal.isOpen}>
          <PasswordReset />
        </Modal>
        
        </>
    )
}

export default ResetPassword

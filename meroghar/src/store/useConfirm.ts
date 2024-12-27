
import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  content:{
    header:string,
    actionBtn:string,
    onAction:()=>void
  }

  onContent:(content:{header:string,actionBtn:string,onAction:()=>void})=>void,

  
 
}

const useConfirm = create<ModalStore>((set) => ({
  //default
    content:{
        header:"Are You Sure U Want To Continue ?",
        actionBtn:"Submit",
        onAction:()=>console.log('Action Called')
    },
    onContent:(newContent)=> set({content:newContent}), 


}));


export default useConfirm;
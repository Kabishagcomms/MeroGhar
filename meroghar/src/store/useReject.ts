
import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  id:string,
  setId:(id:string)=>void

  btn:string,
  setbtn:(btn:string)=>void

  action:{
    onReject:(message:string)=>void
  }

  onContent:(action:{onReject:(messsage:string)=>void})=>void,

  
}

const useReject = create<ModalStore>((set) => ({
  id:" header:string, header:string,",
  setId:(id:string)=>set({id:id}),
  btn:'Reject',
  setbtn:(btn:string)=>set({btn:btn}),

  //here action contains on reject function which is called finally
  action:{
     onReject:(message:string)=>console.log('Action Called ',message)
  },
  
  //on content is used to set action function before the model renders 
  onContent:(newContent)=> set({action:newContent}), 

}));


export default useReject;
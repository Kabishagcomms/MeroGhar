import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application

interface ModalStore {
  isOpen: string;
  onOpen: (modal:string) => void;
  isLoading:boolean;
  setLoading:(state:boolean)=>void
  onClose: () => void;
}

const useModal = create<ModalStore>((set) => ({
  //default
  isOpen:'close',

  isLoading:false,
  setLoading:(state:boolean)=>set({isLoading:state}),
  // need argument to open which login or register modal
  onOpen: (modal:string) => set({ isOpen:modal }),
  //close
  onClose: () => set({ isOpen:'close' })
}));


export default useModal;
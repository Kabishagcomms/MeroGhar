import { create } from 'zustand';

//this is used for profile/account view where the account state is controlled edit profile,account,passsowrd 

interface ModalStore {
  openComponent: string;
  onOpen: (modal:string) => void;
  onClose: () => void;
}

const useAccount= create<ModalStore>((set) => ({
  //default
  openComponent:'close',
  // need argument to open which login or register modal
  onOpen: (comp:string) => set({openComponent:comp}),
  //close
  onClose: () => set({openComponent:'close'})
}));


export default useAccount;
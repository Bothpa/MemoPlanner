import {create} from 'zustand';

interface accountStore{
    isLogin : boolean;
    id : string;
    name : string;
    setAccountLogin : (id:string, name:string) => void;
    setAccountLogout : () => void;
}

const accountStore = create<accountStore>( set => ({
    isLogin : false,
    id:"null",
    name:"null",
    setAccountLogin: (id:string,name:string) => {
        set({ isLogin:true, id : id, name : name});
    },
    setAccountLogout: () => {
        set({ isLogin:false ,id : "null", name : "null"});
    }
}));

export { accountStore };

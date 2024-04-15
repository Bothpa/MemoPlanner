import {create} from 'zustand';

interface accountStore{
    isLogin : boolean;
    id : string;
    name : string;
    profileImg : string;
    setAccountLogin : (id:string, name:string, profileImg : string) => void;
    setAccountLogout : () => void;
}

const accountStore = create<accountStore>( set => ({
    isLogin : false,
    id:"null",
    name:"null",
    profileImg : "null",
    setAccountLogin: (id:string,name:string,profileImg : string) => {
        set({ isLogin:true, id : id, name : name , profileImg : profileImg });
    },
    setAccountLogout: () => {
        set({ isLogin:false ,id : "null", name : "null", profileImg : "null"});
    }
}));

export { accountStore };

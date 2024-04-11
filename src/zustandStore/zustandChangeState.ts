import {create} from 'zustand';

interface changeStateStore{
    change:number;
    setChange : () => void;
}

const changeStateStore = create<changeStateStore>( set => ({
    change : 0,
    setChange: () => {
        set(state => ({change: state.change+1}));
    },
}));

export { changeStateStore };

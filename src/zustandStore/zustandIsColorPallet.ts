import {create} from 'zustand';

interface isColorPalletProps {
    isColorPallet : boolean;
    setIsColorPalletChange : (state:boolean) => void;
}

const isColorPalletStore = create<isColorPalletProps>( set => ({
    isColorPallet : false,
    setIsColorPalletChange:(state)=>{set({isColorPallet:!state})},
}));

export { isColorPalletStore };
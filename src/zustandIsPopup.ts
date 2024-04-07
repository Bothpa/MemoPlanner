import {create} from 'zustand';

interface Popup{
    isPopup: boolean;
    setPopupIn: () => void;
    setPopupOut: () => void;
}

const isPopupStore = create<Popup>( set => ({
    isPopup : false,
    setPopupIn: () => {
        set({ isPopup: true });
    },
    setPopupOut: () => {
        set({ isPopup: false });
    }
}))

export { isPopupStore };

// const isPopup = isPopupStore(state => state.isPopup);

// const setPopupIn = isPopupStore(state => state.setPopupIn);
// const setPopupOut = isPopupStore(state => state.setPopupOut);

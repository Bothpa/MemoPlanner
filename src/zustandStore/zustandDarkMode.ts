import {create} from 'zustand';

interface DarkMode{
    isDarkMode: boolean;
    setDarkMode: () => void;
    setLightMode: () => void;
}

const LocalStorageIsDarkMode = () => {
    const data = localStorage.getItem('isDarkMode') || "false";
    let isDarkMode:boolean;
    if(data === 'true'){
        isDarkMode = true;
    }else if(data === 'false'){
        isDarkMode = false;
    }else{
        isDarkMode = false;
    }

    return isDarkMode;
}

const DarkModeStore = create<DarkMode>( set => ({
    isDarkMode : LocalStorageIsDarkMode() || false,
    setDarkMode: () => {
        set({ isDarkMode: true });
        localStorage.setItem('isDarkMode', 'true');
    },
    setLightMode: () => {
        set({ isDarkMode: false });
        localStorage.setItem('isDarkMode', 'false');
    }
}))

export { DarkModeStore };

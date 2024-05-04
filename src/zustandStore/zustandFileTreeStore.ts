import {create} from 'zustand';

interface fileTree {
    name : string;
    path : string;
    isDirectory : boolean;
    children : fileTree[]|null;
}

interface fileTreeStore{
    fileTree: fileTree[]|null;
    setFileTree : (data:fileTree[]) => void;
}

const fileTreeStore = create<fileTreeStore>( set => ({
    fileTree : null,
    setFileTree: (data) => {
        set({ fileTree: data });
    },
}));

export { fileTreeStore };
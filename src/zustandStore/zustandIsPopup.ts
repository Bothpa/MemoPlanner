import {create} from 'zustand';

interface Popup{
    isPopup: boolean;
    year : number;
    month : number;
    day : number;
    userSchedule : {year:number, month:number, day:number, id:number, color:string, usertext:string}[] | null;
    setPopupIn: (year:number,month:number,day:number,userSchedule:userSchedule[]) => void;
    setPopupOut: () => void;
}

interface userSchedule{
    year:number;
    month:number;
    day:number;
    id:number;
    color:string;
    usertext:string;
}

const isPopupStore = create<Popup>( set => ({
    isPopup : false,
    year : 0,
    month : 0,
    day : 0,
    userSchedule : null,
    setPopupIn: (year:number,month:number,day:number, userSchedule:userSchedule[]) => {
        set({ 
            isPopup: true, 
            year : year,
            month : month,
            day : day,
            userSchedule : userSchedule,
        });
    },
    setPopupOut: () => {
        set({ 
            isPopup: false,
            year : 0,
            month : 0,
            day : 0,
            userSchedule : null,
        });
    }
}))

export { isPopupStore };

// const isPopup = isPopupStore(state => state.isPopup);

// const setPopupIn = isPopupStore(state => state.setPopupIn);
// const setPopupOut = isPopupStore(state => state.setPopupOut);

import {create} from 'zustand';

interface schedulePopupProps{
    isSchedulePopup:boolean;
    year:number|null;
    month:number|null;
    day:number|null;
    id:number|null;
    color:string|null;
    usertext:string|null;
    setSchedulePopupIn: (userSchedule:userSchedule|null) => void;
    setSchedulePopupPlus: (year:number,month:number,day:number) => void;
    setSchedulePopupOut: () => void;
}

interface userSchedule{
    year:number;
    month:number;
    day:number;
    id:number;
    color:string;
    usertext:string;
}

const schedulePopupStore = create<schedulePopupProps>( set => ({
    isSchedulePopup:false,
    year:null,
    month:null,
    day:null,
    id:null,
    color:null,
    usertext:null,
    setSchedulePopupIn: (userSchedule:userSchedule|null) => {
        set({ 
            isSchedulePopup:true,
            year:userSchedule?userSchedule.year:null,
            month:userSchedule?userSchedule.month:null,
            day:userSchedule?userSchedule.day:null,
            id:userSchedule?userSchedule.id:null,
            color:userSchedule?userSchedule.color:null,
            usertext:userSchedule?userSchedule.usertext:null,
        });
    },
    setSchedulePopupOut: () => {
        set({ 
            isSchedulePopup:false,
            year:null,
            month:null,
            day:null,
            id:null,
            color:null,
            usertext:null,
        });
    },
    setSchedulePopupPlus : (year, month, day)=>{
        set({ 
            isSchedulePopup:true,
            year:year,
            month:month,
            day:day,
            id:null,
            color:null,
            usertext:null,
        });
    }
}))

export { schedulePopupStore };
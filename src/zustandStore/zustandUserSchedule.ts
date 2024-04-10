import {create} from 'zustand';

interface userSchedule {
    year : number;
    month : number;
    day : number;
    color : string;
    usertext : string;
    id : number;
}

interface holidayStore{
    userSchedule: userSchedule[]|null;
    setUserSchedule : (data:userSchedule[]) => void;
}

const userScheduleStore = create<holidayStore>( set => ({
    userSchedule : null,
    setUserSchedule: (data) => {
        set({ userSchedule: data });
    },
}));

export { userScheduleStore };

// const holiday = holidayStore(state => state.holiday);


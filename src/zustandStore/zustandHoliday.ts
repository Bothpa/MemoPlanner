import {create} from 'zustand';

interface holiday {
    year : number;
    month : number;
    day : number;
    text : string;
}

interface holidayStore{
    holiday: holiday[]|null;
    setHoliday : (data:holiday[]) => void;
}

const holidayStore = create<holidayStore>( set => ({
    holiday : null,
    setHoliday: (data) => {
        set({ holiday: data });
    },
}));

export { holidayStore };

// const holiday = holidayStore(state => state.holiday);


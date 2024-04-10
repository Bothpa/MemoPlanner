import {create} from 'zustand';

interface calendar {
    day: number | null;
    month: number | null;
    weekDay: string | null;
    year: number | null;
}

interface calendarStore{
    calendar: calendar[]|null;
    setCalendar : (data:calendar[]) => void;
}

const calendarStore = create<calendarStore>( set => ({
    calendar : null,
    setCalendar: (data) => {
        set({ calendar: data });
    },
}));

export { calendarStore };

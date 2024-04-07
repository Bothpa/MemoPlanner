import {create} from 'zustand';

interface NowDateInterface{
    year : number;
    setNextYear: () => void;
    setPreYear: () => void;
    month : number;
    setNextMonth: () => void;
    setPreMonth: () => void;

    setNowDate: () => void;
}

const returnNowYear = () => {
    const now: Date = new Date();
    const currentYear:number = now.getFullYear();
    return currentYear;
}

const returnNowMonth = () => {
    const now: Date = new Date();
    const currentMonth: number = now.getMonth() + 1;
    return currentMonth;
}

const NowDateStore = create<NowDateInterface>(set => {
    const currentYear = returnNowYear();
    const currentMonth = returnNowMonth();

    return {
        year: currentYear,
        setNextYear: () => set(state => ({ year: state.year + 1 })),
        setPreYear: () => set(state => ({ year: state.year - 1 })),
        month: currentMonth,
        setNextMonth: () => {
            set(state => {
                const nextMonth = state.month === 12 ? 1 : state.month + 1;
                const nextYear = state.month === 12 ? state.year + 1 : state.year;
                return { month: nextMonth, year: nextYear };
            });
        },
        setPreMonth: () => {
            set(state => {
                const preMonth = state.month === 1 ? 12 : state.month - 1;
                const preYear = state.month === 1 ? state.year - 1 : state.year;
                return { month: preMonth, year: preYear };
            });
        },

        setNowDate: () => {
            set(state => {
                const preMonth = returnNowMonth();
                const preYear = returnNowYear();
                return { month: preMonth, year: preYear };
            });
        }
    };
});


export { NowDateStore };

// const year = NowDateStore(state => state.year);
// const month = NowDateStore(state => state.month);

// const nextYearEvect = NowDateStore(state => state.setNextYear);
// const preYearEvect = NowDateStore(state => state.setPreYear)

// const nextYearMonth = NowDateStore(state => state.setNextMonth);
// const preYearMonth = NowDateStore(state => state.setPreMonth);

// const nowDate = NowDateStore(state => state.setNowDate);

// {year}년 {month}월||
// <button onClick={nextYearEvect}>다음년도</button>||
// <button onClick={preYearEvect}>이전년도</button>||
// <button onClick={nextYearMonth}>다음달</button>||
// <button onClick={preYearMonth}>이전달</button>
// <button onClick={nowDate}>오늘</button>
import { NowDateStore } from '../../zustandStore/zustandDate';
import { DarkModeStore } from '../../zustandStore/zustandDarkMode';
import ButtonSimple from '../Button/ButtonSimple';



const CalendarHeader = () => {
  const year:number = NowDateStore(state => state.year);
  const month:number = NowDateStore(state => state.month);
  const nextYearMonth:()=>void = NowDateStore(state => state.setNextMonth);
  const preYearMonth:()=>void = NowDateStore(state => state.setPreMonth);
  const nowDate:()=>void = NowDateStore(state => state.setNowDate);
  const { isDarkMode } = DarkModeStore();
  
    return (
      <div className="w-full h-full p-3 relative">

        <div className={`text-3xl mb-1 font-semibold ${isDarkMode?'':'text-black'}`}>{year}.{month}</div>

        <div className='absolute bottom-2'>
          <ButtonSimple onClick={preYearMonth} label='이전달'/>
          <ButtonSimple onClick={nextYearMonth} label='다음달'/>
          <ButtonSimple onClick={nowDate} label='오늘'/>
        </div>

      </div>
    );
  }
  
  export default CalendarHeader;
  
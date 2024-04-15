import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import Calendar from '../Components/Calendar/Calendar';
import CalendarHeader from '../Components/Calendar/CalendatHeader';

const CalendarPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full ${isDarkMode ? 'dark' : 'light'}`}>
        <div className='w-full h-[13%]'><CalendarHeader/></div>
        <div className='w-full h-[87%]'><Calendar/></div>
    </div>
  );
}

export default CalendarPage;

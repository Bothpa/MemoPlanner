import React, { useCallback, useEffect, useState  } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeStore } from './zustandStore/zustandDarkMode';
import { NowDateStore } from './zustandStore/zustandDate';
import { holidayStore } from './zustandStore/zustandHoliday';
import { HolidayApi } from './Hooks/HolydayApi';
import { calendarStore } from './zustandStore/zustandCalendar';
import DateCalculation from './Hooks/DateCalculationApi';
import { userScheduleApi } from './Hooks/UserScheduleApi';
import { userScheduleStore } from './zustandStore/zustandUserSchedule';

import Body from './Pages/Body';
import ComHeader from './Header/ComHeader';
import PhoneHeader from './Header/PhoneHeader';
import { PopupPage, SchedulePopup } from './Components/index';

const App = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const { year, month } = NowDateStore();
  const { setHoliday } = holidayStore();
  const { setCalendar } = calendarStore();
  const { setUserSchedule } = userScheduleStore();

  // 달력정보 store에 저장
  useEffect(()=>{
    const avData:any = []
    setCalendar(avData);setHoliday(avData);setUserSchedule(avData);

    // Calendar
    const CF = async()=>{
      const data = await DateCalculation(year,month);
      setCalendar(data);
    }
    // Holiday
    const HF = async()=>{
      const data = await HolidayApi(year,month);
      setHoliday(data);
    }
    // UserSchedule
    const UF = async() => {
      const data = await userScheduleApi(year,month);
      setUserSchedule(data);
    }
    UF();
    CF();
    HF();
  },[year,month])


  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <BrowserRouter>

      {/* 컴퓨터 */}
        <div className='Com-Header'><ComHeader/></div>
      {/* 바디 */}
        <div className='Body'><Body/></div>
      {/* 핸드폰 */}
        <div className='Phone-Header'><PhoneHeader/></div>
      {/* 팝업 */}
        <PopupPage/>
        <SchedulePopup/>

      </BrowserRouter>
    </div>
  );
}

export default App;

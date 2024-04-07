import React, { useCallback, useEffect, useState } from 'react';
import { DarkModeStore } from '../zustandDarkMode';
import { Calendar } from '../Components/index';
import { CalendarHeader } from '../Components/index';
import { NowDateStore } from '../zustandDate';


const CalendarPage = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  const year = NowDateStore(state => state.year);
  const month = NowDateStore(state => state.month);

  return (
    <div className={`w-full h-full ${isDarkMode ? 'dark' : 'light'}`}>
        <div className='w-full h-[13%]'><CalendarHeader/></div>
        <div className='w-full h-[87%]'><Calendar/></div>
    </div>
  );
}

export default CalendarPage;

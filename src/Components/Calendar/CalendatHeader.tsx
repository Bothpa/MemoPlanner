import React, { useCallback, useEffect, useState } from 'react';
import { NowDateStore } from '../../zustandDate';
import { DarkModeStore } from '../../zustandDarkMode';
import { isPopupStore } from '../../zustandIsPopup';

interface ChangeDateButtonProps {
  label:string;
  onClick: ()=>void;
}

const ChangeDateButton: React.FC<ChangeDateButtonProps> = ({ onClick, label }) => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);
  return (
    <button className={`text-base p-1 mr-1 rounded-lg ${isDarkMode ? 'myAllBorder-dark' : 'myAllBorder-light'}`} onClick={onClick}>{label}</button>
  );
}

const CalendarHeader = () => {
  const year:number = NowDateStore(state => state.year);
  const month:number = NowDateStore(state => state.month);
  const nextYearMonth:()=>void = NowDateStore(state => state.setNextMonth);
  const preYearMonth:()=>void = NowDateStore(state => state.setPreMonth);
  const nowDate:()=>void = NowDateStore(state => state.setNowDate);
  const setDarkMode:()=>void = DarkModeStore(state => state.setDarkMode);
  const setLightMode:()=>void = DarkModeStore(state => state.setLightMode);
  
    return (
      <div className="w-full h-full p-3 relative">

        <div className='text-3xl mb-1 font-semibold'>{year}.{month}</div>

        <div className='absolute bottom-2'>
          <ChangeDateButton onClick={preYearMonth} label='이전달'/>
          <ChangeDateButton onClick={nextYearMonth} label='다음달'/>
          <ChangeDateButton onClick={nowDate} label='오늘'/>

          {/* 임시 */}
          <ChangeDateButton onClick={setDarkMode} label='다크모드'/>
          <ChangeDateButton onClick={setLightMode} label='라이트모드'/>
          {/* 임시 */}
          
        </div>

        

      </div>
    );
  }
  
  export default CalendarHeader;
  
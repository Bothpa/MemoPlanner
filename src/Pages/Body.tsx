import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DarkModeStore } from '../zustandStore/zustandDarkMode';
import CalendarPage from './CalendarPage';
import MemoPage from './MemoPage';



const Body = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full flex justify-center ${isDarkMode ? 'dark' : 'light'}`}>
        <Routes>
        {/* 게시판 */}
        <Route path='/' element={<CalendarPage/>}/>
        <Route path='/memo' element={<MemoPage/>}/>
        {/* 없는 url 예외처리 */}
        <Route path={"*"} element={<CalendarPage/>} />
      </Routes>
    </div>
  );
}

export default Body;

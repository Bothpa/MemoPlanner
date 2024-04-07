import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DarkModeStore } from '../zustandDarkMode';



const PhoneHeader = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`w-full h-full  ${isDarkMode ? 'dark' : 'light'}`}>
        핸드폰 전용 헤더입니다
    </div>
  );
}

export default PhoneHeader;

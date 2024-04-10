import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DarkModeStore } from '../zustandStore/zustandDarkMode';



const PhoneHeader = () => {
  const isDarkMode = DarkModeStore(state => state.isDarkMode);

  return (
    <div className={`${isDarkMode ? 'dark border-t-[1px] border-gray-700' : 'light border-t-2'} w-full h-full`}>
        핸드폰 전용 헤더입니다
    </div>
  );
}

export default PhoneHeader;
